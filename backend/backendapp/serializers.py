from rest_framework import serializers
from .models import LoadPosting, LoadStop

class LoadStopSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoadStop
        fields = '__all__'

class LoadPostingSerializer(serializers.ModelSerializer):
    stops = LoadStopSerializer(many=True, read_only=True)

    class Meta:
        model = LoadPosting
        fields = '__all__'
