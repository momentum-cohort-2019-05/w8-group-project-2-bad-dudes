from django.shortcuts import render, redirect
from core.models import Question, Answer, Favorite
from django.contrib.auth.decorators import login_required
from core.forms import QuestionCreateForm


# Create your views here.


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

@login_required
def add_question(request):
    """adds a question authored by the pk of the user"""
    # breakpoint()
    if request.method == 'POST':
        form = QuestionCreateForm(request.POST)
        if form.is_valid():
            title = form.cleaned_data['title']
            content = form.cleaned_data['content']
            new_question = Question(author=request.user,content=content,title=title)
            new_question.save()
        return redirect(to='home')
    else:
        form = QuestionCreateForm()

        return render(request, 'core/new-question.html', {
            'form' : form,
        })