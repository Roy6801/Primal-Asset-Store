from  rest_framework import generics, mixins
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import  UserSerializer
from .models import User
from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404

#userAuth
class userAuth(APIView):
    def get_object(self, googleId):
        
        try:
            return User.objects.get(googleId = googleId)
        except User.DoesNotExist:
            raise Http404

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

    def put(self,request,googleId):
        user = self.get_object(googleId)
        serializer = UserSerializer(user , data =request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status= status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#userProfile
class UserProfile(APIView):
    def get_object(self, googleId):
        
        try:
            return User.objects.get(googleId = googleId)
        except User.DoesNotExist:
            raise Http404

    def get(self, request,googleId, format=None):
        user = self.get_object(googleId)
        serializer = UserSerializer(user)        
        return Response(serializer.data)
        
    
    def put(self,request,googleId):
        user = self.get_object(googleId)
        serializer = UserSerializer(user , data =request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status= status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self,request,googleId,forma = None):
        user = self.get_object(googleId)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    '''@api_view(['GET','POST'])
    def userAuth(request):
    if request.method == 'GET':
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
        '''
    
