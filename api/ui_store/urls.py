from django.urls import path
from .views import *

urlpatterns = [
    path('discover/<str:filter>', Discover.as_view()),
    path('search/<str:search>', Search.as_view()),
    path('asset/', UiAsset.as_view()),
]
