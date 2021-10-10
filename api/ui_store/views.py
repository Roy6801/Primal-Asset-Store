from django.http.response import HttpResponseNotFound
from django.shortcuts import render
from django.http import HttpResponse

from primal_user.models import Asset, Review
from primal_user.serializer import AssetSerializer, ReviewSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.http import Http404

import random

# Create your views here.

char = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3',
    '4', '5', '6', '7', '8', '9'
]


def idGen():
    return "".join(random.choices(char, k=50))


def validation():
    try:
        idCreated = idGen()
        Asset.objects.filter(assetId=idCreated).exists()
        return idCreated
    except:
        validation()


class Discover(APIView):
    def get(self, request):
        return HttpResponse("UI / I Discovered!!")


def browse(request):
    return HttpResponse("UI / I'm Browsing!!")


#UI Assets display
class UiAsset(APIView):
    #for saving the user
    def post(self, request):
        idFound = validation()
        request.data['assetId'] = idFound
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
            return Asset.objects.get(assetId=assetId)
        except Asset.DoesNotExist:
            raise Http404

    #getting assets deaetials
    def get(self, request, assetId):
        user = self.get_object(assetId)
        serializer = AssetSerializer(user)
        return Response(serializer.data)

    #for upadting assets info
    def put(self, request, assetId):
        user = self.get_object(assetId)
        serializer = AssetSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #for deleting the assets
    def delete(self, request, assetId):
        user = self.get_object(assetId)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#To get Review of particular Asset
class AssetReview(APIView):
    def get(self, request, assetId):
        try:
            review = Review.objects.filter(assetId=assetId)
            serializer = ReviewSerializer(review, many=True)
            return Response(serializer.data)
        except Review.DoesNotExist:
            raise Http404


#To post a review on Asset
class ReviewPost(APIView):
    #used just to check if its working
    def get(self, request, format=None):
        user = Review.objects.all()
        serializer = ReviewSerializer(user, many=True)
        return Response(serializer.data)

    #For User To post the review for asset
    def post(self, request):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)