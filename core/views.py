from django.shortcuts import render

# Create your views here.

from core.models import Question, Answer, Favorite

def index(request):
    """View function for home page of site."""

    # Generate counts of some of the main objects
    question_list = Question.objects.all()
    
    context = {
        'question_list': question_list,
    }

    # Render the HTML template index.html with the data in the context variable
    return render(request, 'index.html', context=context)


def question_detail(request,pk):
    question = Question.objects.get(pk=pk)

    return render(request, 'core/question_detail.html', {
        'question' : question,

    })