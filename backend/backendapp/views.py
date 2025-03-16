from django.db.models import Q
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import LoadPosting
from .serializers import LoadPostingSerializer

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
    """
    Example: /api/search-loads/?origin=atlanta&destination=orlando
            &start_date=2025-03-16&end_date=2025-03-20
    """
    origin_query = request.GET.get('origin', '')
    destination_query = request.GET.get('destination', '')
    start_date = request.GET.get('start_date', None)
    end_date = request.GET.get('end_date', None)

    # Base queryset
    queryset = LoadPosting.objects.all()

    # Filter for origin if provided:
    # We look for stops with stop_type='P' and city/state/zip matching origin_query.
    # We'll do an __icontains match so it's case-insensitive and partial matches work.
    if origin_query:
        queryset = queryset.filter(
            Q(stops__stop_type='P') & 
            (Q(stops__city__icontains=origin_query) | 
            Q(stops__state__icontains=origin_query) | 
            Q(stops__postal_code__icontains=origin_query))
        )

    # Filter for destination if provided:
    if destination_query:
        queryset = queryset.filter(
            Q(stops__stop_type='D') & 
            (Q(stops__city__icontains=destination_query) | 
            Q(stops__state__icontains=destination_query) | 
            Q(stops__postal_code__icontains=destination_query))
        )

    # Optional: filter by date. If the user picks a pickup date range,
    # we can filter stops__appointment_from or stops__appointment_to.
    # Example: only loads that have a pickup date >= start_date
    # and a drop date <= end_date. You can adapt as needed.
    if start_date:
        queryset = queryset.filter(
            Q(stops__stop_type='P') & Q(stops__appointment_from__gte=start_date)
        )
        
    if end_date:
        queryset = queryset.filter(
            Q(stops__stop_type='D') & Q(stops__appointment_to__lte=end_date)
        )

    # Distinct, because we did multiple filters that might overlap the same load
    queryset = queryset.distinct()

    # Serialize the results
    serializer = LoadPostingSerializer(queryset, many=True)
    return Response(serializer.data)
