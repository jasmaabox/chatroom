from django.conf.urls import url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^(?P<label>^[a-z0-9_-]+)/$', views.chat_room, name='chat_room'),
]
