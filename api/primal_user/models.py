from re import T
from django.db import models
from django.core.validators import BaseValidator, RegexValidator


# Create your models here.
class User(models.Model):
    userName = models.CharField(max_length=32, primary_key=True)
    firstName = models.CharField(max_length=32, null=False, default='')
    lastName = models.CharField(max_length=32, null=True)
    phoneNumberRegex = RegexValidator(regex=r"^\+?1?\d{8,15}$")
    phoneNumber = models.CharField(validators=[phoneNumberRegex],
                                   max_length=16,
                                   unique=True)
    email1 = models.EmailField(max_length=32, blank=False)
    email2 = models.EmailField(max_length=32, blank=True)
    bio = models.TextField(blank=True)
    planId = models.ForeignKey('primal_user.Plans', on_delete=models.CASCADE)
    securityPin = models.IntegerField(null=True)
    accountCreationDate = models.DateTimeField()
    coins = models.IntegerField(default=0)
    assetsDownloaded = models.IntegerField(default=0)
    assetsPurchased = models.IntegerField(default=0)
    imageURL = models.CharField(max_length=256, null=True)
    googleId = models.CharField(max_length=256, null=True)

    def __str__(self):
        return self.userName


class Plans(models.Model):
    planId = models.CharField(max_length=10,
                              primary_key=True,
                              default="DEFAULT VALUE")
    quota = models.CharField(max_length=10)


class Tags(models.Model):
    keywordId = models.CharField(max_length=20, primary_key=True)
    keyword = models.CharField(max_length=20)


class SearchHistory(models.Model):
    historyId = models.CharField(max_length=20, primary_key=True)
    userId = models.ForeignKey('primal_user.User', on_delete=models.CASCADE)
    keywordId = models.ForeignKey('primal_user.Tags', on_delete=models.CASCADE)


class Asset(models.Model):
    assetId = models.CharField(max_length=20, primary_key=True)
    devUserId = models.ForeignKey('primal_user.User', on_delete=models.CASCADE)
    keywordId = models.ForeignKey('primal_user.Tags', on_delete=models.CASCADE)
    assetName = models.CharField(max_length=50, null=False)
    description = models.TextField(blank=True)
    features = models.TextField(blank=True)
    uploadedDate = models.DateField(auto_now_add=True)
    typeId = models.BooleanField(default=True)
    paidStatus = models.BooleanField(default=False)
    price = models.IntegerField(null=True)
    size = models.FloatField(null=False)
    downloadCount = models.BigIntegerField(null=True)
    version = models.CharField(max_length=10)


class Review(models.Model):
    reviewId = models.CharField(max_length=20, primary_key=True)
    userId = models.ForeignKey('primal_user.User', on_delete=models.CASCADE)
    assetId = models.ForeignKey('primal_user.Asset', on_delete=models.CASCADE)
    rating = models.FloatField(null=True)
    comment = models.TextField(blank=True)
    date = models.DateField(auto_now_add=True)


class Order(models.Model):
    cartId = models.CharField(max_length=20, primary_key=True)
    userId = models.ForeignKey('primal_user.User', on_delete=models.CASCADE)
    assetId = models.ForeignKey('primal_user.Asset', on_delete=models.CASCADE)
    orderId = models.CharField(max_length=20)
    transactionId = models.CharField(max_length=50)
    success = models.BooleanField(default=False)
    purchaseDate = models.DateField(auto_now_add=True)
