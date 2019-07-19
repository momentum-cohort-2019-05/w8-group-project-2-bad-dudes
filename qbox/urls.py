"""qbox URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from core import views, json_views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
]

# Use include() to add paths from the catalog application 


urlpatterns += [
    path('', RedirectView.as_view(url='index/')),
    path('index/', views.index, name='home'),
    path('accounts/', include('allauth.urls')),
    path('question-detail/<int:pk>', views.question_detail, name='question-detail'),
    path('question-detail/<int:pk>/new-answer', views.add_answer, name='new-answer'),
    path('new-question/', views.add_question, name='new-question'),
    path('core/new-question/', views.add_question, name='new-question'),
]

urlpatterns += [
    path('json/mark-correct/<int:question_pk>/<int:answer_pk>/',
        json_views.post_mark_correct, name="json_post_mark_correct"),
    path('json/post-answer/<int:question_pk>/',
        json_views.post_answer, name="json_post_answer"),
]

# Use static() to add url mapping to serve static files during development (only)


urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)