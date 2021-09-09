from django.shortcuts import redirect, render
from django.http import HttpResponse
from .models import *
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
import json
# Create your views here.


def discover(request):
    return HttpResponse("User / I Discovered!!")


def browse(request):
    return HttpResponse("User / I'm Browsing!!")


@csrf_exempt
def userAuth(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        first_name = data['givenName']
        last_name = data['familyName']
        email_1 = data['email1']
        google_id = data['googleId']
        image_url = data['imageUrl']
        if User.objects.filter(googleId=google_id).exists():
            print(User.objects.filter(googleId=google_id))
            return HttpResponse("1")
        else:
            try:
                user = User(firstName=first_name,
                            lastName=last_name,
                            email1=email_1,
                            imageURL=image_url,
                            googleId=google_id)
                user.save()
                return HttpResponse("1")
            except Exception as e:
                print(e)
                return HttpResponse("0")
