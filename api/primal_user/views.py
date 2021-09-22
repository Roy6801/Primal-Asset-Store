from typing import final
from django.http import response
from django.http.response import HttpResponseBadRequest, HttpResponseForbidden, HttpResponseNotAllowed
from django.shortcuts import redirect, render
from django.http import HttpResponse
from .models import *
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework import generics, mixins
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import AssetSerializer, OrderSerializer, SearchHistorySerializer, UserSerializer
from .models import User, Asset,Order
from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404

# Create your views here.

def discover(request):
    return HttpResponse("User / I Discovered!!")


def browse(request):
    return HttpResponse("User / I'm Browsing!!")


#userAuth
class UserAuth(APIView):
    def get(self, request, format=None):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
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

    #for updatind user Details
    def put(self, request, googleId):
        user = self.get_object(googleId)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #for deleting user account
    def delete(self, request, googleId, forma=None):
        user = self.get_object(googleId)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#for checking if the Username Exits or not
class UserName(APIView):
    def get(self, request, userName):
        try:
            User.objects.get(userName=userName)
            return Response(status=status.HTTP_403_FORBIDDEN)
        except User.DoesNotExist:
            return Response(status=status.HTTP_200_OK)

    # def put(self, request, userName):
    #     try:
    #         user = User.objects.get(userName=userName)
    #         serializer = UserSerializer(user)
    #         return Response(status=status.HTTP_403_FORBIDDEN)
    #     except User.DoesNotExist:
    #         user = User.objects.get(userName=userName)
    #         serializer = UserSerializer(user)
    #         if serializer.is_valid():
    #             serializer.save()
    #             return Response(status=status.HTTP_200_OK)
    #         return Response(status=status.HTTP_400_BAD_REQUEST)

#To get User Asset usingdevUserId(googleId)
class UserAsset(APIView):
    def get(self,request,devUserId):
        try:
            user = Asset.objects.filter(devUserId=devUserId)
            serializer = AssetSerializer(user, many = True)
            return Response(serializer.data)
        except Asset.DoesNotExist:
            raise Http404

#Tosee the Items in the cart
class UserCart(APIView):
    def get(self,request,userId):
        try:
            user = Order.objects.filter(userId=userId)
            serializer = OrderSerializer(user, many = True)
            return Response(serializer.data)
        except Asset.DoesNotExist:
            raise Http404

#To view the history of User
class UserHistory(APIView):
    def get(self,request,userId):
        try:
            user = SearchHistory.objects.filter(userId=userId)
            serializer = SearchHistorySerializer(user, many = True)
            return Response(serializer.data)
        except Asset.DoesNotExist:
            raise Http404
