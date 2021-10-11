from django.http import HttpResponse
from primal_user.serializer import AssetSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from ui_store.views import validation

# Create your views here.


def discover(request):
    return HttpResponse("Game / I Discovered!!")


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
