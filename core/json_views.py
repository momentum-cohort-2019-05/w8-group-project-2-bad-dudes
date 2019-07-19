from django.shortcuts import get_object_or_404
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
    if request.user == question.author:
        if previous_correct_answer_pk:
            question.correct_answer = None
        question.correct_answer = correct_answer
        question.save()

    return JsonResponse({"question": req_data['questionPk'], "previous_correct_answer_pk": previous_correct_answer_pk})

@login_required
@require_http_methods(['POST'])
def post_fav_answer(request, answer_pk):
    """
    Given a JSON request containing a answer pk from a user, store that favorite
    and reply
    """
    user = request.user
    answer = get_object_or_404(Answer, pk=answer_pk)
    question = answer.target_question
    new_favorite = Favorite(user=user, question=question, answer=answer)
    new_favorite.save()

    return JsonResponse({})

@require_http_methods(['POST'])
def post_fav_question(request, question_pk):
    """
    DOC string
    """
    # breakpoint()
    print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!post_fav!!!!!!!!!!!!!!!!!!!!!!!!!!")
    req_data = json.loads(request.body.decode("UTF-8"))
    user = request.user
    answer = None
    question = get_object_or_404(Question, pk=question_pk)
    new_favorite = Favorite(user=user, question=question, answer=answer)
    new_favorite.save()

    return JsonResponse({"question": req_data['questionPk']})


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