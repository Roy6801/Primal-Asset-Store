
from django.urls import path
from django.urls.resolvers import URLPattern
from .views  import  UserAuth, UserProfile

#urlpatterns = [path('auth/', views.userAuth)]

urlpatterns = [
    path('auth/', UserAuth.as_view()),
    path('auth/<str:googleId>', UserProfile.as_view()),
]