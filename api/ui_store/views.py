from django.http import HttpResponse
from primal_user.models import Asset, User
from primal_user.serializer import AssetSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.db.models import Avg
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
    type = False

    def fetch_publisher(self, assetList):
        data = []
        for asset in assetList:
            obj = asset
            user = User.objects.get(googleId=asset['devUserId'])
            serializer = UserSerializer(user)
            obj['userName'] = serializer.data['userName']
            data.append(obj)
        return data

    def get(self, request, filter):
        if filter == "latest_publishes":
            assets = Asset.objects.filter(
                typeId=self.type).order_by('-createdDate')[:4]

        elif filter == "top_downloads":
            assets = Asset.objects.filter(
                typeId=self.type).order_by('-downloadCount')[:4]
        elif filter == "top_rated":
            assets = Asset.objects.filter(
                typeId=self.type).order_by('avgRating')[:4]
        else:
            Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = AssetSerializer(assets, many=True)
        data = self.fetch_publisher(serializer.data)
        return Response(data)


class Search(APIView):
    type = False

    def get(self, request, search):
        assets = Asset.objects.filter(typeId=self.type,
                                      assetName__icontains=search)
        assets = Asset.objects.filter(typeId=self.type,
                                      assetName__icontains=search)
        serializer = AssetSerializer(assets, many=True)
        return Response(serializer.data)


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
