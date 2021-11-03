from django.http import HttpResponse
from rest_framework.serializers import Serializer
from stripe.api_resources import payment_method
from .models import *
from rest_framework.response import Response
from .serializer import AssetSerializer, FavoriteSerializer, OrderSerializer, SearchHistorySerializer, ThumbnailSerializer, UserSerializer, ReviewSerializer
from .models import User, Asset, Order, Thumbnail
from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404
from static.fire import FireAPI
from django.db.models import Avg
from dotenv import load_dotenv, find_dotenv
import os

import stripe

load_dotenv(find_dotenv())

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
        try:
            user = self.get_object(googleId)
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_200_OK)
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)

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


#User Cart
class UserCart(APIView):
    def get(self, request, userId):
        try:
            user = Order.objects.filter(userId=userId, bought=False)
            serializer = OrderSerializer(user, many=True)
            obj = {}
            key = 0
            for order in serializer.data:
                obj[key] = order
                assetInfo = Asset.objects.get(assetId=order['assetId'])
                assetData = AssetSerializer(assetInfo)
                obj[key]['assetInfo'] = assetData.data
                key += 1
            return Response(serializer.data)
        except Asset.DoesNotExist:
            raise Http404

    def put(self, request, userId):
        try:
            for item in request.data:
                Order.objects.filter(
                    userId=userId, assetId=item['assetId']).update(bought=True)
            return Response(status=status.HTTP_200_OK)
        except:
            raise Http404

    def delete(self, request, userId):
        try:
            user = Order.objects.filter(userId=userId, bought=False)
            user.delete()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserCoins(APIView):
    def put(self, request, googleId):
        try:
            User.objects.filter(googleId=googleId).update(
                coins=request.data['coins'])
            return Response(status=status.HTTP_200_OK)
        except:
            raise Http404


class UserOrders(APIView):
    def get(self, request, userId):
        try:
            user = Order.objects.filter(userId=userId, bought=True)
            serializer = OrderSerializer(user, many=True)
            obj = {}
            key = 0
            for order in serializer.data:
                obj[key] = order
                assetInfo = Asset.objects.get(assetId=order['assetId'])
                assetData = AssetSerializer(assetInfo)
                obj[key]['assetInfo'] = assetData.data
                key += 1
            return Response(serializer.data)
        except Asset.DoesNotExist:
            raise Http404


class CreateOrder(APIView):
    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)


class DeleteOrder(APIView):
    def delete(self, request, cartId):
        try:
            user = Order.objects.filter(cartId=cartId)
            user.delete()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserFav(APIView):
    def get(self, request, googleId, assetId):
        try:
            val = Favorites.objects.filter(userId=googleId,
                                           assetId=assetId).count()
            if val == 0:
                raise Http404
            return Response(status=status.HTTP_200_OK)
        except Favorites.DoesNotExist:
            raise Http404

    def post(self, request, googleId, assetId):
        try:
            serializer = FavoriteSerializer(data={
                "userId": googleId,
                "assetId": assetId
            })
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
        except:
            pass
        raise Http404

    def delete(self, request, googleId, assetId):
        try:
            fav = Favorites.objects.filter(userId=googleId, assetId=assetId)
            fav.delete()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ListFav(APIView):
    def get(self, request, googleId):
        try:
            fav = Favorites.objects.filter(userId=googleId)
            favSerializer = FavoriteSerializer(fav, many=True)
            obj = {"count": fav.count(), "assetList": []}
            print(obj)
            for i in favSerializer.data:
                asset = Asset.objects.get(assetId=i["assetId"])
                assetSerializer = AssetSerializer(asset)
                obj['assetList'].append(assetSerializer.data)
            return Response(obj)
        except:
            raise Http404


class PayIntent(APIView):

    stripe.api_key = os.getenv("stripe_secret_key")

    def post(self, request):
        client_secret = stripe.PaymentIntent.create(
            amount=request.data["amount"],
            currency=request.data["currency"])["client_secret"]
        return HttpResponse(client_secret)


class SetPay(APIView):
    def put(self, request):
        try:
            User.objects.filter(googleId=request.data['googleId']).update(
                accountNumber=request.data['accountNumber'],
                ifsc=request.data['ifsc'])
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
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
            avgRating = Review.objects.filter(
                assetId=request.data['assetId']).aggregate(Avg('rating'))
            Asset.objects.filter(assetId=request.data['assetId']).update(
                avgRating=avgRating['rating__avg'])
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
            avgRating = Review.objects.filter(
                assetId=request.data['assetId']).aggregate(Avg('rating'))
            Asset.objects.filter(assetId=assetId).update(
                avgRating=avgRating['rating__avg'])
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
