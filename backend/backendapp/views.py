from django.shortcuts import render
from rest_framework import generics
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
