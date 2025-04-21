from django.db.models import Q, F, ExpressionWrapper, FloatField, Value, Case, When
from rest_framework import generics
from django.db.models.functions import Replace
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import LoadPosting, AppUser, Favorite
from .serializers import LoadPostingSerializer, AppUserSerializer, FavoriteSerializer
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
    
class AppUserListCreate(generics.ListCreateAPIView):
    queryset         = AppUser.objects.all()
    serializer_class = AppUserSerializer
    
class FavoriteListCreate(generics.ListCreateAPIView):
    serializer_class = FavoriteSerializer

    def get_queryset(self):
        # only return this user’s favorites
        uid = self.kwargs['userid']
        return Favorite.objects.filter(user__userid=uid)

    def perform_create(self, serializer):
        # attach the AppUser instance based on URL
        user = AppUser.objects.get(userid=self.kwargs['userid'])
        serializer.save(user=user)
        
class FavoriteDetail(generics.RetrieveDestroyAPIView):

    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    lookup_field = 'pk'
    
@api_view(['GET'])
def search_load_postings(request):
    
    origin_query      = (request.GET.get('origin') or '').strip()
    destination_query = (request.GET.get('destination') or '').strip()
    start_raw         = (request.GET.get('start_date') or '').strip()
    end_raw           = (request.GET.get('end_date') or '').strip()
    cap_type_raw      = (request.GET.get('capacity_type') or '').strip()
    haz               = (request.GET.get('is_hazardous') or '').strip().lower()
    high_val          = (request.GET.get('is_high_value') or '').strip().lower()
    temp_ctrl         = (request.GET.get('is_temperature_controlled') or '').strip().lower()
    weight_min        = (request.GET.get('total_weight') or '').strip()
    rpm_min           = (request.GET.get('loaded_rpm') or '').strip()

    parsed_start = parse_date(start_raw) if start_raw else None
    parsed_end   = parse_date(end_raw)   if end_raw   else None
    
    # queryset = LoadPosting.objects.all()
    qs = LoadPosting.objects.all()
    
    # both origin and destination and given
    if origin_query and destination_query:
        qs = qs.filter(
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
        
    # just origin
    elif origin_query:
        qs = qs.filter(
            Q(stops__stop_type='P') &
            (
                Q(stops__city__icontains=origin_query) |
                Q(stops__state__icontains=origin_query) |
                Q(stops__postal_code__icontains=origin_query)
            )
        )
        
    # just destination
    elif destination_query:
        qs = qs.filter(
            Q(stops__stop_type='D') &
            (
                Q(stops__city__icontains=destination_query) |
                Q(stops__state__icontains=destination_query) |
                Q(stops__postal_code__icontains=destination_query)
            )
        )
    
    # if start date and end date are given 
    if parsed_start and parsed_end:
        qs = qs.filter(
            Q(stops__stop_type='P') &
            Q(stops__appointment_from__lte=
                datetime.combine(parsed_end, time.max).replace(tzinfo=pytz.UTC))
        ).filter(
            Q(stops__stop_type='D') &
            Q(stops__appointment_to__gte=
                datetime.combine(parsed_start, time.min).replace(tzinfo=pytz.UTC))
        )
        
    # just the start date
    elif parsed_start:
        qs = qs.filter(
            Q(stops__stop_type='P') &
            Q(stops__appointment_from__gte=
                datetime.combine(parsed_start, time.min).replace(tzinfo=pytz.UTC))
        )
        
    # just the end date
    elif parsed_end:
        qs = qs.filter(
            Q(stops__stop_type='D') &
            Q(stops__appointment_to__lte=
                datetime.combine(parsed_end, time.max).replace(tzinfo=pytz.UTC))
        )
    
    # is hazardous?
    if haz in ['true','false']:
        qs = qs.filter(is_hazardous=(haz=='true'))
        
    # is high value?
    if high_val in ['true','false']:
        qs = qs.filter(is_high_value=(high_val=='true'))
        
    # is temperature controlled?
    if temp_ctrl in ['true','false']:
        qs = qs.filter(is_temperature_controlled=(temp_ctrl=='true'))
        
    # minimum weight limit
    if weight_min:
        try:
            qs = qs.filter(total_weight__gte=float(weight_min))
        except ValueError:
            pass
    
    # capacity type
    if cap_type_raw:
        # strip spaces (incl. NBSP) from both sides
        cap_clean = ''.join(cap_type_raw.split())
        # annotate a “no‑space” version of capacity_type
        qs = qs.annotate(
            cap_norm=Replace(
                Replace(F('capacity_type'),
                        Value(' '),  Value('')),
                        Value('\u00A0'), Value('')
            )
        ).filter(cap_norm__iexact=cap_clean)
        
    qs = qs.annotate(
        distance_final=Case(
            When(total_distance__isnull=True, then=Value(216)),
            default=F('total_distance'),
            output_field=FloatField()
        )
    ).annotate(
        total_price=ExpressionWrapper(
            F('distance_final') * Value(25),
            output_field=FloatField()
        )
    ).annotate(
        rate_per_mile=ExpressionWrapper(
            F('total_price') / F('distance_final'),
            output_field=FloatField()
        )
    )
    
    # minimum rate per mile
    if rpm_min:
        try:
            qs = qs.filter(rate_per_mile__gte=float(rpm_min))
        except ValueError:
            pass

    # --- final distinct + serialize ---
    qs = qs.distinct()
    serializer = LoadPostingSerializer(qs, many=True)
    
    return Response(serializer.data)