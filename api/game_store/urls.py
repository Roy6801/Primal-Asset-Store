from django.urls import path
from . import views

urlpatterns = [path('', views.discover), path('browse/', views.browse)]
