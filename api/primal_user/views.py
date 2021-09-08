from django.shortcuts import redirect, render
from django.http import HttpResponse
from .models import *
from django.contrib import messages
# Create your views here.


def discover(request):
    return HttpResponse("User / I Discovered!!")


def browse(request):
    return HttpResponse("User / I'm Browsing!!")


def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        first_name= request.POST['first_name']
        last_name= request.POST['last_name']
        email_1= request.POST['email1']
        mobile_no= request.POST['mobile_no']
        if User.objects.filter(userName = username).exists():
            return "0"
        else:
            user = User(userName=username,firstName=first_name,lastName=last_name,phoneNumber=mobile_no,email1=email_1)
            user.save()
            return redirect('discover')
    else:
        return render(request,'register.js')
