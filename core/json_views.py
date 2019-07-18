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
    if request.user.is_authenticated:
        pass
    return JsonResponse({"question":req_data['question'], "answer":req_data['answer']})

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