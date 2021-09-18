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

#userAuth
class userAuth(APIView):
    
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

   
#userProfile
class UserProfile(APIView):
    
    def get_object(self, googleId):
        try:
            return User.objects.get(googleId=googleId)
        except User.DoesNotExist:
            raise Http404

    #To get the user details
    def get(self, request,googleId, format=None):
        user = self.get_object(googleId)
        serializer = UserSerializer(user)
        return Response(serializer.data)
        
    #for updatind user Details
    def put(self,request,googleId):
        user = self.get_object(googleId)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #for deleting user account
    def delete(self,request,googleId,forma = None):
        user = self.get_object(googleId)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
#for checking if the Username Exits or not 
class USerName(APIView):
    
    def get_object(self, userName):
        
        try:
            return User.objects.get(userName = userName)
        except User.DoesNotExist:
            raise Http404

    def get(self, request,userName, format=None):
        user = self.get_object(userName)
        serializer = UserSerializer(user)        
        return Response(serializer.data)
        
    def put (self, request, userName):
        user = self.get_object(userName)
        serializer = UserSerializer(user , data =request.data)
        if User.objects.filter(userName=userName).exists():
            return Response(status= status.HTTP_403_FORBIDDEN)
        else:
            if serializer.is_valid():    
                serializer.save()
                return Response(status= status.HTTP_200_OK)
            return Response(status = status.HTTP_400_BAD_REQUEST)



'''@csrf_exempt
def userAuth(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        first_name = data['givenName']
        last_name = data['familyName']
        email_1 = data['email1']
        google_id = data['googleId']
        image_url = data['imageUrl']
        if User.objects.filter(googleId=google_id).exists():
            print(User.objects.filter(googleId=google_id))
            return HttpResponse("1")
        else:
            try:
                user = User(firstName=first_name,
                            lastName=last_name,
                            email1=email_1,
                            imageURL=image_url,
                            googleId=google_id)
                user.save()
                return HttpResponse("1")
            except Exception as e:
                print(e)
                return HttpResponse("0")'''
