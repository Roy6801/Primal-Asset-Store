from django.urls import path
from .views import *

urlpatterns = [
    path('asset/',UiAsset.as_view()),
    path('asset/<str:assetId>',UiAssetDetails.as_view()),
    path('browse/', browse),
     ]
