from django.urls import path
from .views import *

urlpatterns = [
    path('asset/', GameAsset.as_view()),
    path('browse/', browse),
    path('', discover),
]
