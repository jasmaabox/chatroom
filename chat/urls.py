from django.conf.urls import url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^home/', views.home, name='home'),
     url(r'^(?P<label>[\w-]{,50})/$', views.chat_room, name='chat_room'),
]
