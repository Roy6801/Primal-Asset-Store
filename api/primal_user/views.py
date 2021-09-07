from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def discover(request):
    return HttpResponse("User / I Discovered!!")


def browse(request):
    return HttpResponse("User / I'm Browsing!!")