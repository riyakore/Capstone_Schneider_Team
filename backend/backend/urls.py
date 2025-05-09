"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from backendapp.views import LoadPostingListView, LoadPostingDetailView, search_load_postings, AppUserListCreate, FavoriteListCreate, FavoriteDetail

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/load-postings/', LoadPostingListView.as_view(), name='loadposting-list'),
    path('api/load-postings/<str:load_id>/', LoadPostingDetailView.as_view(), name='loadposting-detail'),
    path('api/search-loads/', search_load_postings, name='search-load-postings'),
    path('api/users/', AppUserListCreate.as_view(), name='users'),
    path('api/users/<userid>/favorites/', FavoriteListCreate.as_view(), name='user-favorites'),
    path('api/users/<userid>/favorites/<int:pk>/', FavoriteDetail.as_view(), name='user-favorite-detail'),
]
