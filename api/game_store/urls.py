from django.urls import path
from .views import GameAsset, GameAssetDetails, browse, discover
from ui_store.views import AssetReview,ReviewPost


urlpatterns = [
    path('asset/',GameAsset.as_view()),
    path('asset/<str:assetId>',GameAssetDetails.as_view()),
    path('asset/review/<str:assetId>',AssetReview.as_view()),
    path('asset/review/',ReviewPost.as_view()),
    path('browse/', browse),
    path('',discover),
     ]