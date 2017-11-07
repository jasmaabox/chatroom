from django.shortcuts import render

def home(request):
    return render(request, "static_pages/home.html")
def liability(request):
    return render(request, "static_pages/liability.html")
