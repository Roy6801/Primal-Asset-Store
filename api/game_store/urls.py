from django.urls import path

from .views import *

urlpatterns = [
    path('asset/', GameAsset.as_view()),
    path('search/<str:search>', Search.as_view()),
    path('discover/<str:filter>', Discover.as_view()),
]
