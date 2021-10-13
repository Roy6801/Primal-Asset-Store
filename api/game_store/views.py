from django.http import HttpResponse
from primal_user.models import Asset
from primal_user.serializer import AssetSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from ui_store.views import validation

# Create your views here.


class Discover(APIView):
    type = True

    def get(self, request, filter):

        if filter == "latest_publishes":
            assets = Asset.objects.filter(
                typeId=self.type).order_by('-createdDate')[:4]
            serializer = AssetSerializer(assets, many=True)
            return Response(serializer.data)
        elif filter == "top_downloads":
            assets = Asset.objects.filter(
                typeId=self.type).order_by('-downloadCount')[:4]
            serializer = AssetSerializer(assets, many=True)
            return Response(serializer.data)
        elif filter == "top_rated":
            assets = Asset.objects.filter(
                typeId=self.type).order_by('avgRating')[:4]
            serializer = AssetSerializer(assets, many=True)
            return Response(serializer.data)
        else:
            Response(status=status.HTTP_400_BAD_REQUEST)


class Search(APIView):
    type = True

    def get(self, request, search):
        assets = Asset.objects.filter(typeId=self.type, assetId__icontains=search)
        serializer = AssetSerializer(assets, many=True)
        return Response(serializer.data)


def browse(request):
    return HttpResponse("Game / I'm Browsing!!")


#Game Assets display
class GameAsset(APIView):
    #for saving the user
    def post(self, request):
        idFound = validation()
        request.data['assetId'] = idFound
        serializer = AssetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
