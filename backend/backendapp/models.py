from django.db import models

# Create your models here.

# this is the load posting class which has information about each load
class LoadPosting(models.Model):
    
    load_id = models.CharField(max_length=15, unique=True, primary_key = True)
    
    posting_status = models.CharField(max_length=50, blank=True, null=True)
    source_system = models.CharField(max_length=50, blank=True, null=True)
    
    has_appointments = models.BooleanField(default=False)
    is_hazardous = models.BooleanField(default=False)
    is_high_value = models.BooleanField(default=False)
    is_temperature_controlled = models.BooleanField(default=False)
    
    total_distance = models.FloatField(blank=True, null=True)
    distance_uom = models.CharField(max_length=10, blank=True, null=True)
    total_weight = models.FloatField(blank=True, null=True)
    weight_uom = models.CharField(max_length=10, blank=True, null=True)
    
    number_of_stops = models.IntegerField(blank=True, null=True)
    transport_mode = models.CharField(max_length=50, blank=True, null=True)
    
    created_date = models.DateTimeField(blank=True, null=True)
    updated_date = models.DateTimeField(blank=True, null=True)
    
    managed_equipment = models.BooleanField(max_length=50, blank=True, null=True)
    
    load_number_alias = models.CharField(max_length=100, blank=True, null=True)
    
    is_carb = models.BooleanField(default=False)
    fpc = models.BooleanField(blank=True, null=True)
    fpo = models.BooleanField(blank=True, null=True)
    
    division = models.CharField(max_length=50, blank=True, null=True)
    capacity_type = models.CharField(max_length=50, blank=True, null=True)
    
    extended_network = models.BooleanField(blank=True, null=True)
    
    def __str__(self):
        return f"Load {self.load_id}"
    
class LoadStop(models.Model):
    
    # ForeignKey to link each stop to a LoadPosting
    load_posting = models.ForeignKey(
        LoadPosting,
        related_name='stops',
        on_delete=models.CASCADE
    )
    
    stop_id = models.CharField(max_length=50, blank=True, null=True)
    stop_sequence = models.IntegerField(blank=True, null=True)
    stop_type = models.CharField(max_length=1, blank=True, null=True)
    activity_type = models.CharField(max_length=50, blank=True, null=True)
    appointment_from = models.DateTimeField(blank=True, null=True)
    appointment_to = models.DateTimeField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    postal_code = models.CharField(max_length=20, blank=True, null=True)
    time_zone = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)
    location_name = models.CharField(max_length=200, blank=True, null=True)
    address_line_1 = models.CharField(max_length=200, blank=True, null=True)
    address_line_2 = models.CharField(max_length=200, blank=True, null=True)
    appointment_state = models.CharField(max_length=50, blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    updated_date = models.DateTimeField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.stop_type} Stop #{self.stop_sequence} for Load {self.load_posting.load_id}"
    
# this is the new model for users
class AppUser(models.Model):
    userid = models.CharField(max_length=100, unique=True, primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.userid
    

# this is the new model for favorites
class Favorite(models.Model):
    user = models.ForeignKey(AppUser, related_name='favorites', on_delete=models.CASCADE)
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    transport_mode = models.CharField(max_length=50, blank=True, null=True)
    capacity_type = models.CharField(max_length=50, blank=True, null=True)
    

    def __str__(self):
        return f"Favorite for {self.user.userid}: {self.origin} → {self.destination}"
