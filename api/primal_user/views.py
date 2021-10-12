from django.http import HttpResponse
from .models import *
from rest_framework.response import Response
from .serializer import AssetSerializer, OrderSerializer, SearchHistorySerializer, ThumbnailSerializer, UserSerializer, ReviewSerializer
from .models import User, Asset, Order, Thumbnail
from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404
from static.fire import FireAPI
import os

# Create your views here.


def discover(request):
    return HttpResponse("User / I Discovered!!")


def browse(request):
    return HttpResponse("User / I'm Browsing!!")


#userAuth
class UserAuth(APIView):
    def get(self, request):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)

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

    #for updatind user Details
    def put(self, request, googleId):
        user = self.get_object(googleId)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #for deleting user account
    def delete(self, request, googleId):
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


#To get User Asset usingdevUserId(googleId)
class UserAsset(APIView):
    def get(self, request, devUserId):
        try:
            user = Asset.objects.filter(devUserId=devUserId)
            serializer = AssetSerializer(user, many=True)
            return Response(serializer.data)
        except Asset.DoesNotExist:
            raise Http404


class ViewPublisher(APIView):
    def get(self, request, userName):
        try:
            publisher = User.objects.get(userName=userName)
            userData = UserSerializer(publisher)
            assets = Asset.objects.filter(devUserId=userData.data['googleId'])
            assetsList = AssetSerializer(assets, many=True)
            data = {"publisher": userData.data, "assets": assetsList.data}
            return Response(data)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class QueryAsset(APIView):
    def __init__(self):
        self.conn = FireAPI()

    def get(self, request, assetId):
        try:
            user = Asset.objects.get(assetId=assetId)
            serializer = AssetSerializer(user)
            return Response(serializer.data)
        except Asset.DoesNotExist:
            raise Http404

    def post(self, request, assetId):
        path = os.path.join(os.path.abspath("static/media"), assetId)
        fileName = request.data['fileName']
        file = request.FILES['fileData'].read()
        size = request.data['fileSize']
        try:
            os.makedirs(path)
            os.remove(path + "/" + fileName)
        except:
            pass
        with open(path + "/" + fileName, "wb") as fw:
            fw.write(file)
        response = self.conn.uploadAsset(request.data)
        if response:
            Asset.objects.filter(assetId=assetId).update(uploaded=response,
                                                         size=size)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, assetId):
        asset = Asset.objects.get(assetId=assetId)
        try:
            asset.delete()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)


class EditAsset(APIView):
    def put(self, request, assetId):
        try:
            asset = Asset.objects.get(assetId=assetId)
            serializer = AssetSerializer(asset, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_200_OK)
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
        except Asset.DoesNotExist:
            raise Http404


#To see the Items in the cart
class UserCart(APIView):
    def get(self, request, userId):
        try:
            user = Order.objects.filter(userId=userId)
            serializer = OrderSerializer(user, many=True)
            return Response(serializer.data)
        except Asset.DoesNotExist:
            raise Http404


#To view the history of User
class UserHistory(APIView):
    def get(self, request, userId):
        try:
            user = SearchHistory.objects.filter(userId=userId)
            serializer = SearchHistorySerializer(user, many=True)
            return Response(serializer.data)
        except Asset.DoesNotExist:
            raise Http404


#To get Review of particular Asset
class AssetReviews(APIView):
    def get(self, request, assetId):
        try:
            review = Review.objects.filter(assetId=assetId)
            serializer = ReviewSerializer(review, many=True)
            data = []
            for asset in serializer.data:
                obj = asset
                user = User.objects.get(googleId=asset['userId'])
                userData = UserSerializer(user)
                obj['userName'] = userData.data['userName']
                data.append(obj)
            return Response(data)
        except Review.DoesNotExist:
            raise Http404


class PostReview(APIView):
    def post(self, request):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#To post a review on Asset
class UserReview(APIView):
    def get(self, request, assetId, userId):
        try:
            review = Review.objects.get(assetId=assetId, userId=userId)
            serializer = ReviewSerializer(review)
            return Response(serializer.data)
        except:
            raise Http404

    #For User To edit the review for asset
    def put(self, request, assetId, userId):
        review = Review.objects.get(assetId=assetId, userId=userId)
        serializer = ReviewSerializer(review, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, assetId, userId):
        try:
            review = Review.objects.get(assetId=assetId, userId=userId)
            review.delete()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)


class AssetThumbnails(APIView):
    def __init__(self):
        self.conn = FireAPI()

    def get(self, request, assetId):
        thumbnails = Thumbnail.objects.filter(assetId=assetId)
        serializer = ThumbnailSerializer(thumbnails, many=True)
        return Response(serializer.data)

    def post(self, request, assetId):
        path = os.path.join(os.path.abspath("static/media"), assetId)
        fileCount = request.data['fileCount']
        for i in range(int(fileCount)):
            fileName = request.data[f"{i}_file"]
            file = request.FILES[fileName].read()
            try:
                os.makedirs(path)
                os.remove(path + "/" + fileName)
            except:
                pass
            with open(path + "/" + fileName, "wb") as fw:
                fw.write(file)

        urls = self.conn.uploadThumbnails(request.data)
        for url in urls:
            thumbnail = ThumbnailSerializer(data={
                'assetId': assetId,
                'thumbnailURL': url
            })
            if thumbnail.is_valid():
                thumbnail.save()
        if len(urls) == int(fileCount):
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)