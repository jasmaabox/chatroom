from django.db import models
from django.utils import timezone, html

"""
TODO:
client will ping room
if a room has been pinged within the last 5 minutes, it will be active
"""

class Room(models.Model):
    name = models.TextField()
    label = models.SlugField(unique=True)
    currentTossUp = models.ForeignKey(TossUp)
    isActive = models.BooleanField()

    def __str__(self):
        return self.name + "," + self.label

class TossUp(models.Model):
    label = models.SlugField(unique=True)
    question = models.TextField()
    answer = models.TextField()

class Buzz(models.Model):
    room = models.ForeignKey(Room, related_name='messages')

    handle = models.TextField()
    handle_color = models.TextField()
    answer = models.TextField()
    isCorrect = models.BooleanField()
    timestamp = models.DateTimeField(default=timezone.now, db_index=True)

    def as_dict(self):
        return {
                'handle': html.escape(self.handle),
                'handle_color':self.handle_color,
                'message': html.escape(self.message),
                }
