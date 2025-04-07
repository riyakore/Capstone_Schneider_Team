from django.db.models import Q
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import LoadPosting
from .serializers import LoadPostingSerializer
from datetime import datetime, time
import pytz
from django.utils.dateparse import parse_date

# Create your views here.
class LoadPostingListView(generics.ListAPIView):
    queryset = LoadPosting.objects.all()
    serializer_class = LoadPostingSerializer

class LoadPostingDetailView(generics.RetrieveAPIView):
    queryset = LoadPosting.objects.all()
    serializer_class = LoadPostingSerializer
    lookup_field = 'load_id'
    
@api_view(['GET'])
def search_load_postings(request):
    origin_query = request.GET.get('origin', '')
    destination_query = request.GET.get('destination', '')
    start_date = request.GET.get('start_date', None)
    end_date = request.GET.get('end_date', None)

    queryset = LoadPosting.objects.all()
    
    if origin_query and destination_query:
        queryset = queryset.filter(
            Q(stops__stop_type='P') &
            (
                Q(stops__city__icontains=origin_query) |
                Q(stops__state__icontains=origin_query) |
                Q(stops__postal_code__icontains=origin_query)
            )
        ).filter(
            Q(stops__stop_type='D') &
            (
                Q(stops__city__icontains=destination_query) |
                Q(stops__state__icontains=destination_query) |
                Q(stops__postal_code__icontains=destination_query)
            )
        )

    # 1) Filter origin
    if origin_query and not destination_query:
        queryset = queryset.filter(
            Q(stops__stop_type='P') &
            (
                Q(stops__city__icontains=origin_query) |
                Q(stops__state__icontains=origin_query) |
                Q(stops__postal_code__icontains=origin_query)
            )
        )

    # 2) Filter destination
    if destination_query and not origin_query:
        queryset = queryset.filter(
            Q(stops__stop_type='D') &
            (
                Q(stops__city__icontains=destination_query) |
                Q(stops__state__icontains=destination_query) |
                Q(stops__postal_code__icontains=destination_query)
            )
        )

    # 3) Filter dates
    if start_date and end_date:
        # Must have pickup >= start_date
        # we need to convert the date to a datetime object because comparision should span the entire day
        query_start = datetime.combine(parse_date(start_date), time.min).replace(tzinfo=pytz.UTC)
        query_end = datetime.combine(parse_date(end_date), time.max).replace(tzinfo=pytz.UTC)
        
        queryset = queryset.filter(
            Q(stops__stop_type='P') & Q(stops__appointment_from__lte=query_end)
        ).filter(
            Q(stops__stop_type='D') & Q(stops__appointment_to__gte=query_start)
        )

    elif start_date:
        # only have a start date => pickup >= start_date
        query_start = datetime.combine(parse_date(start_date), time.min).replace(tzinfo=pytz.UTC)
        queryset = queryset.filter(
            Q(stops__stop_type='P') & Q(stops__appointment_from__lte=query_start)
        ).distinct()

    elif end_date:
        # only have an end date => drop <= end_date
        query_end = datetime.combine(parse_date(end_date), time.max).replace(tzinfo=pytz.UTC)
        queryset = queryset.filter(
            Q(stops__stop_type='D') & Q(stops__appointment_to__gte=query_end)
        ).distinct()

    # 4) Final distinct + serialization
    queryset = queryset.distinct()
    serializer = LoadPostingSerializer(queryset, many=True)
    return Response(serializer.data)