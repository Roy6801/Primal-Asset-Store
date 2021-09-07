from re import T
from django.db import models
from django.core.validators import RegexValidator

# Create your models here.
class User(models.Model):
    useranme =models.CharField(max_length = 20, primary_key= True)
    firstName = models.CharField(max_length = 20, null=True)
    lastName = models.CharField(max_length= 20,null=True)
    phoneNumberRegex = RegexValidator(regex = r"^\+?1?\d{8,15}$")
    phoneNumber = models.CharField(validators = [phoneNumberRegex], max_length = 16, unique = True)
    email1 = models.EmailField(max_length=20, blank=False)
    email2 = models.EmailField(max_length=20, blank=True)
    bio = models.TextField(blank=True)
    planId= models.ForeignKey('primal_user.Plans' ,on_delete=models.CASCADE)
    securityPin = models.IntegerField( null=True)
    accountCreationDate = models.DateTimeField()

class Plans(models.Model):
    planId = models.CharField(max_length=10, primary_key=True,default="DEFAULT VALUE")
    quota = models.CharField(max_length=10)
