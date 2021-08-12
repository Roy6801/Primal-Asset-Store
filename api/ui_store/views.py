from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def discover(request):
    return HttpResponse("UI / I Discovered!!")


def browse(request):
    return HttpResponse("UI / I'm Browsing!!")
