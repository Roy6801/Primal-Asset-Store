
from django.urls import path
from django.urls.resolvers import URLPattern
from .views  import  UserAsset, UserAuth, UserCart, UserHistory,UserProfile,UserName

#urlpatterns = [path('auth/', views.userAuth)]

urlpatterns = [
    path('auth/', UserAuth.as_view()),
    path('profile/<str:googleId>', UserProfile.as_view()),
    path('profile/exist/<str:userName>',UserName.as_view()),
    path('asset/userid/<str:devUserId>',UserAsset.as_view()),
    path('cart/<str:userId>',UserCart.as_view()),
    path('history/<str:userId>',UserHistory.as_view())
]
