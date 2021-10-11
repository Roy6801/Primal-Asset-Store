from django.http import HttpResponse
from primal_user.models import Asset
from primal_user.serializer import AssetSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
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
