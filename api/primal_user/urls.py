
from django.urls import path
from django.urls.resolvers import URLPattern
from .views  import  userAuth,UserProfile

#urlpatterns = [path('auth/', views.userAuth)]

urlpatterns = [
    path('userAuth/', userAuth.as_view()),
    path('userAuth/<int:googleId>', UserProfile.as_view()),
]