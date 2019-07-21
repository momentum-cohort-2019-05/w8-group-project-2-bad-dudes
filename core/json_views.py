from django.shortcuts import get_object_or_404, redirect
from core.models import Question, Answer, Favorite
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
import json

@require_http_methods(['POST'])
def post_mark_correct(request, question_pk, answer_pk):
    """
    Given a JSON request containing a question pk from the author and the pk
    of the answer they chose as correct, store that correct, remove the previous
    correct answer (if any) and reply
    """

    req_data = json.loads(request.body.decode("UTF-8"))
    question = get_object_or_404(Question, pk=question_pk)
    correct_answer = get_object_or_404(Answer, pk=answer_pk)
    try:
        previous_correct_answer_pk = question.correct_answer.pk
    except:
        previous_correct_answer_pk = None


    print (answer_pk)
    print (previous_correct_answer_pk)

    if request.user == question.author and answer_pk == previous_correct_answer_pk:
        question.correct_answer = None
        question.save()
    elif request.user == question.author:
        if previous_correct_answer_pk:
            question.correct_answer = None
        question.correct_answer = correct_answer
        question.save()
    
    return JsonResponse({"question": req_data['questionPk'], "previous_correct_answer_pk": previous_correct_answer_pk})


@require_http_methods(['POST'])
def post_answer (request, question_pk):
    req_data = json.loads(request.body.decode("UTF-8"))
    question = get_object_or_404(Question, pk=question_pk)
    new_answer = Answer(author=request.user, content=req_data['answerInput'], target_question=question)
    new_answer.save()

    
    
    return JsonResponse({"question": req_data['questionPk'], "answerInput": req_data['answerInput']})
@login_required
@require_http_methods(['POST'])
def post_fav_answer(request, answer_pk):
    """
    Given a JSON request containing a answer pk from a user, store that favorite
    and reply. If the answer is already favorited, remove it. Return a JSON response
    containing a bool 'removed' that's true if the old_fav was deleted and false
    if a new favorite was created
    """
    # see if there's an existing favorite that matches the request
    answer = get_object_or_404(Answer, pk=answer_pk)
    removed = False
    old_fav = Favorite.objects.filter(user=request.user).filter(answer=answer).first()
    if old_fav:
        old_fav.delete()
        removed = True
    else:
        user = request.user
        question = answer.target_question
        new_favorite = Favorite(user=user, question=question, answer=answer)
        new_favorite.save()

    return JsonResponse({'removed': removed})

@login_required
@require_http_methods(['POST'])
def post_fav_question(request, question_pk):
    question = get_object_or_404(Question, pk=question_pk)
    removed = False
    old_fav = Favorite.objects.filter(user=request.user).filter(question=question).filter(answer=None).first()
    if old_fav:
        old_fav.delete()
        removed = True
    else:
        user = request.user
        answer = None
        new_favorite = Favorite(user=user, question=question, answer=answer)
        new_favorite.save()

    return JsonResponse({'removed': removed})


# @require_http_methods(['POST'])
# def post_card_results(request, card_pk):
#     """
#     Given a JSON request stating whether the card was answered correctly or not,
#     store that answer and reply.
#     """
#     req_data = json.loads(request.body.decode("UTF-8"))
#     if request.user.is_authenticated:
#         card = get_object_or_404(Card, pk=card_pk)
#         card.record_result(req_data['correct'], request.user)

#     return JsonResponse({"correct": req_data['correct']})