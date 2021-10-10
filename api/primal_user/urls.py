from django.urls import path
from django.urls.resolvers import URLPattern
from .views import EditAsset, UserAsset, UserAuth, UserCart, UserHistory, UserProfile, UserName, QueryAsset, ViewPublisher

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
]
