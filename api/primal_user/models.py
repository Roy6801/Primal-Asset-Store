from re import T
from django.db import models
from django.core.validators import BaseValidator, RegexValidator


# Create your models here.
class Plans(models.Model):
    planId = models.CharField(max_length=512, primary_key=True, default="Free")
    quota = models.CharField(max_length=10, default="100MB")


class Tags(models.Model):
    keywordId = models.CharField(max_length=512, primary_key=True)
    keyword = models.CharField(max_length=512)


class User(models.Model):
    googleId = models.CharField(max_length=512, primary_key=True, default='')
    imageURL = models.CharField(max_length=512, null=True)
    userName = models.CharField(max_length=512, null=True)
    firstName = models.CharField(max_length=512, null=True)
    lastName = models.CharField(max_length=512, null=True)
    phoneNumber = models.CharField(max_length=512, null=True)
    email1 = models.CharField(max_length=512, blank=False)
    email2 = models.CharField(max_length=512, blank=True)
    bio = models.TextField(blank=True)
    planId = models.ForeignKey(Plans, on_delete=models.CASCADE, default="Free")
    password = models.CharField(max_length=512, null=True)
    accountCreationDate = models.DateTimeField(auto_now_add=True)
    coins = models.IntegerField(default=2)
    assetsDownloaded = models.IntegerField(default=0)
    assetsPurchased = models.IntegerField(default=0)


class SearchHistory(models.Model):
    historyId = models.CharField(max_length=512, primary_key=True)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    keywordId = models.ForeignKey(Tags, on_delete=models.CASCADE)


class Asset(models.Model):
    assetId = models.CharField(max_length=512, primary_key=True)
    devUserId = models.ForeignKey(User, on_delete=models.CASCADE)
    assetName = models.CharField(max_length=512, null=False)
    description = models.TextField(blank=True)
    features = models.TextField(blank=True)
    createdDate = models.DateField(auto_now_add=True)
    typeId = models.BooleanField(default=True)
    price = models.FloatField(null=True)
    currency = models.CharField(max_length=10, blank=True)
    size = models.FloatField(default=1.0)
    downloadCount = models.BigIntegerField(null=True)
    version = models.CharField(max_length=10, default="1.0.0")
    uploaded = models.CharField(max_length=512, blank=True)


class Review(models.Model):
    reviewId = models.AutoField(primary_key=True)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    assetId = models.ForeignKey(Asset, on_delete=models.CASCADE)
    rating = models.FloatField(null=True)
    comment = models.TextField(blank=True)
    date = models.DateField(auto_now_add=True)


class Order(models.Model):
    cartId = models.CharField(max_length=512, primary_key=True)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    assetId = models.ForeignKey(Asset, on_delete=models.CASCADE)
    orderId = models.CharField(max_length=512)
    transactionId = models.CharField(max_length=50)
    success = models.BooleanField(default=False)
    purchaseDate = models.DateField(auto_now_add=True)


class RelatedTags(models.Model):
    assetId = models.ForeignKey(Asset, on_delete=models.CASCADE)
    keywordId = models.ForeignKey(Tags, on_delete=models.CASCADE)
