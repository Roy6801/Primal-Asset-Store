
from django.urls import path
from django.urls.resolvers import URLPattern
from .views  import  userAuth,UserProfile,USerName

#urlpatterns = [path('auth/', views.userAuth)]

urlpatterns = [
    path('auth/', userAuth.as_view()),
    path('profile/<str:googleId>', UserProfile.as_view()),
    path('profile/<str:userName>',USerName.as_view())
]