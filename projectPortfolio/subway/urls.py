from django.urls import path
from . import views

urlpatterns = [
    path('subway/', views.index)
]
