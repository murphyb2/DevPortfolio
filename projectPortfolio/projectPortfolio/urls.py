from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('projects.urls')),
    path('', include('accounts.urls'))
]
