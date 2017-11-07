from django.shortcuts import render
from django.urls import reverse
from .models import Room, Buzz

def chat_room(request, label):
    # create room if DNE
    room, created = Room.objects.get_or_create(label=label)

    buzzes = room.buzzes.order_by('-timestamp')[:50]

    return render(request, "chat/room.html",{
        'room':room,
        'messages':buzzes,
    })
