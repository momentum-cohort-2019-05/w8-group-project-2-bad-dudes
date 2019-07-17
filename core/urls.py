from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('question-detail/<int:pk>', views.question_detail, name='question-detail'),

]