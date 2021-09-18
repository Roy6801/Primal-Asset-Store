from django.shortcuts import redirect, render
from django.http import HttpResponse
from .models import *
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework import generics, mixins
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import UserSerializer
from .models import User
from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404
# Create your views here.


def discover(request):
    return HttpResponse("User / I Discovered!!")


def browse(request):
    return HttpResponse("User / I'm Browsing!!")


#UserAuth
class UserAuth(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#UserProfile
class UserProfile(APIView):
    def get_object(self, googleId):
        try:
            return User.objects.get(googleId=googleId)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, googleId):
        user = self.get_object(googleId)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, googleId):
        user = self.get_object(googleId)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, googleId):
        user = self.get_object(googleId)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
