from django.shortcuts import render, redirect
from core.models import Question, Answer, Favorite
from django.contrib.auth.decorators import login_required
from core.forms import QuestionCreateForm, AnswerCreateForm
from django.shortcuts import get_object_or_404
import markdown
import bleach
from bleach_whitelist import markdown_tags, markdown_attrs



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
    question_is_favorited = False
    favorited_answer_pk_list = []
    for fav in Favorite.objects.filter(user=request.user, question=question).all():
        if fav.answer:
            favorited_answer_pk_list.append(fav.answer.pk)
    if Favorite.objects.filter(user=request.user).filter(question=question).filter(answer=None).first():
        question_is_favorited = True
    return render(request, 'question_detail.html', {
        'question' : question,
        'question_is_favorited' : question_is_favorited,
        'favorited_answer_pk_list' : favorited_answer_pk_list,
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
            content = markdown.markdown(content)
            content = bleach.clean(content, markdown_tags, markdown_attrs)
            new_question = Question(author=request.user,content=content,title=title)
            new_question.save()
        return redirect(to='home')
    else:
        form = QuestionCreateForm()

        return render(request, 'new-question.html', {
            'form' : form,
        })

@login_required
def add_answer(request, pk):
    """adds a question authored by the pk of the user"""
    target_question = get_object_or_404(Question, pk=pk)

    if request.method == 'POST':
        form = AnswerCreateForm(request.POST)
        if form.is_valid():
            content = form.cleaned_data['content']
            new_answer = Answer(author=request.user,content=content, target_question=target_question)
            new_answer.save()
        return redirect(to='home')
    else:
        form = AnswerCreateForm()

        return render(request, 'new-answer.html', {
            'form' : form,
            'target_question': target_question
        })