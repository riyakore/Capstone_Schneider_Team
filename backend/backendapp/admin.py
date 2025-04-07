from django.contrib import admin
from .models import LoadPosting, LoadStop, AppUser, Favorite

# The models registered in here are the only ones that will be displayed on the backend admin site

admin.site.register(LoadPosting)
admin.site.register(LoadStop)
admin.site.register(AppUser)
admin.site.register(Favorite)