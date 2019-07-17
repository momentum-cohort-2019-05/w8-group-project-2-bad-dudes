from django.urls import path
from . import views
from django.urls import include


urlpatterns = [
    path('', views.index, name='home'),
    path('question-detail/<int:pk>', views.question_detail, name='question-detail'),
    path('accounts/', include('registration.backends.default.urls')),
    path('new-question/', views.add_question, name='new-question'),
]