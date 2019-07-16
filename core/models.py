from django.db import models
from django.contrib.auth.models import User
from datetime import date

# Create your models here.

class Question (models.Model):
    title = models.CharField(max_length = 250)
    content = models.TextField()
    author = models.ForeignKey(to=User, on_delete=models.SET_NULL, null=True)
    correct_answer = models.OneToOneField(to="Answer", on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    times_favorited = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

class Answer (models.Model):
    target_question = models.ForeignKey(to=Question, on_delete=models.CASCADE)
    content = models.TextField()
    author = models.ForeignKey(to=User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    times_favorited = models.PositiveIntegerField(default=0)

class Favorite (models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    question = models.ForeignKey(to=Question,on_delete=models.CASCADE)
    answer = models.ForeignKey(to=Answer, on_delete=models.CASCADE, null=True)