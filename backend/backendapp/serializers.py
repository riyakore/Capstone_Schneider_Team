from rest_framework import serializers
from .models import LoadPosting, LoadStop

class LoadStopSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoadStop
        fields = '__all__'

class LoadPostingSerializer(serializers.ModelSerializer):
    # This will include all the stops related to the load.
    stops = LoadStopSerializer(many=True, read_only=True)

    # The custom fields:
    origin = serializers.SerializerMethodField()
    destination = serializers.SerializerMethodField()

    class Meta:
        model = LoadPosting
        # This automatically includes all fields from the model,
        # plus our custom ones (origin, destination) and the stops.
        fields = '__all__'

    def get_origin(self, obj):
        """
        Compute the origin for a load by finding the first pickup stop.
        We assume stop_type 'P' means pickup.
        """
        # Filter related stops for pickups and order by stop_sequence (ascending)
        pickups = obj.stops.filter(stop_type='P').order_by('stop_sequence')
        if pickups.exists():
            first_pickup = pickups.first()
            return {
                'city': first_pickup.city,
                'state': first_pickup.state,
                'postal_code': first_pickup.postal_code,
            }
        return None

    def get_destination(self, obj):
        """
        Compute the destination for a load by finding the last dropoff stop.
        We assume stop_type 'D' means dropoff.
        """
        # Filter related stops for dropoffs and order by stop_sequence (ascending)
        drops = obj.stops.filter(stop_type='D').order_by('stop_sequence')
        if drops.exists():
            last_drop = drops.last()
            return {
                'city': last_drop.city,
                'state': last_drop.state,
                'postal_code': last_drop.postal_code,
            }
        return None
