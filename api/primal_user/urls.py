from django.urls import path
from .views import *

#urlpatterns = [path('auth/', views.userAuth)]

urlpatterns = [
    path('auth/', UserAuth.as_view()),
    path('profile/<str:googleId>', UserProfile.as_view()),
    path('profile/exist/<str:userName>', UserName.as_view()),
    path('asset/userid/<str:devUserId>', UserAsset.as_view()),
    path('asset/assetid/<str:assetId>', QueryAsset.as_view()),
    path('asset/edit/assetid/<str:assetId>', EditAsset.as_view()),
    path('cart/<str:userId>', UserCart.as_view()),
    path('history/<str:userId>', UserHistory.as_view()),
    path('view/publisher/<str:userName>', ViewPublisher.as_view()),
    path('asset/review/post/', PostReview.as_view()),
    path('asset/review/<str:assetId>/<str:userId>', UserReview.as_view()),
    path('asset/reviews/<str:assetId>', AssetReviews.as_view()),
]
