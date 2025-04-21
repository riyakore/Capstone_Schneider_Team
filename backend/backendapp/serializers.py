from rest_framework import serializers
from .models import LoadPosting, LoadStop, AppUser, Favorite

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
    
    # new fields that need to be added to the database
    loaded_rpm = serializers.SerializerMethodField()
    distance_final = serializers.SerializerMethodField() 
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = LoadPosting
        # This automatically includes all fields from the model,
        # plus our custom ones (origin, destination) and the stops.
        # other methods also automatically included
        fields = '__all__'
        
    def get_loaded_rpm(self, obj):
        return 25
    
    def get_distance_final(self, obj):
        # If total_distance is null, return 216
        if obj.total_distance is None:
            return 216
        
        return obj.total_distance
    
    def get_total_price(self, obj):
        # distance_final * loaded_rpm
        distance = 216 if obj.total_distance is None else obj.total_distance
        return distance * 25

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
        return [
            {
                'city': d.city,
                'state': d.state,
                'postal_code': d.postal_code
            }
            for d in drops
        ]
        return None
    
class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        password = serializers.CharField(write_only=True)
        model  = AppUser
        fields = ['userid','first_name','last_name','phone_number','username', 'password']
        
    def create(self, validated_data):
        user = AppUser(**validated_data)
        user.save()
        return user
        
class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Favorite
        fields = ['id','user','origin','destination','transport_mode','capacity_type', 'min_loaded_rpm', 'min_weight']
        read_only_fields = ['user']
