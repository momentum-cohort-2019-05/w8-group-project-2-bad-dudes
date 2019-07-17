from django.db import models
from django.contrib.auth.models import User
from datetime import date
from django.urls import reverse

# Create your models here.

class Question (models.Model):
    title = models.CharField(max_length = 250)
    content = models.TextField()
    author = models.ForeignKey(to=User, on_delete=models.SET_NULL, null=True)
    correct_answer = models.OneToOneField(to="Answer", on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    times_favorited = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']

    def get_absolute_url(self):
        return reverse('question-detail', args=[str(self.id)])


class Answer (models.Model):
    target_question = models.ForeignKey(to=Question, on_delete=models.CASCADE)
    content = models.TextField()
    author = models.ForeignKey(to=User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    times_favorited = models.PositiveIntegerField(default=0)

    def __str__ (self):
        return f"{self.target_question.title}|{self.content[:25]}"

    class Meta:
        ordering = ['-created_at']

class Favorite (models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    question = models.ForeignKey(to=Question,on_delete=models.CASCADE)
    answer = models.ForeignKey(to=Answer, on_delete=models.CASCADE, null=True, blank=True)

    def __str__ (self):
        if self.answer:
            return f"{self.user}|{self.question.title}|{self.answer[:25]}"
        else:
            return f"{self.user}|{self.question.title}"