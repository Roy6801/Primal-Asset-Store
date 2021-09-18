from django.shortcuts import render
from django.http import HttpResponse

from primal_user.models import Asset
from primal_user.serializer import AssetSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.http import Http404


# Create your views here.


def discover(request):
    return HttpResponse("UI / I Discovered!!")


def browse(request):
    return HttpResponse("UI / I'm Browsing!!")

#UI Assets display
class UiAsset(APIView):
    #for saving the user 
    def post(self, request):
        serializer = AssetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#UI Asset Details
class UiAssetDetails(APIView):
    
    #getting assets by assetId
    def get_object(self, assetId):
        
        try:
            return Asset.objects.get(assetId = assetId)
        except Asset.DoesNotExist:
            raise Http404
    
    #getting assets deaetials
    def get(self, request,assetId, format=None):
        user = self.get_object(assetId)
        serializer = AssetSerializer(user)        
        return Response(serializer.data)
    
    #for upadting assets info
    def put(self,request,assetId):
        user = self.get_object(assetId)
        serializer = AssetSerializer(user , data =request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status= status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #for deleting the assets
    def delete(self,request,assetId,forma = None):
        user = self.get_object(assetId)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)