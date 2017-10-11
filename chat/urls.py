from django.conf.urls import url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^(?P<label>[^/]+)/$', views.chat_room, name='chat_room'),
]
