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
    # card = get_object_or_404(Card, pk=card_pk)
    # card.record_result(req_data['correct'], request.user)
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