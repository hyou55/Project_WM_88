import json
import googletrans
from django.http import JsonResponse
from nltk import word_tokenize, pos_tag
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
def process_text(request):
    if request.method == "POST":
        data = json.loads(request.body)
        text = data.get("text", "")
        tokens = word_tokenize(text)
        analyzed_text = pos_tag(tokens)

        # 명사만 추출하여 리스트에 저장
        nouns = [word for word, pos in analyzed_text if pos.startswith('NN')]

        # 각 단어들 번역하는 공간.
        # translator = googletrans.Translator()
        # result = []
        
        # for i, word in enumerate(nouns) :
        #     result[i] = translator.translate(nouns[i], dest='ko', src='en')
        
        return JsonResponse({'nouns': nouns}) # none 옆에 변수 하나 더 추가해서 데이터를 2개 보내도록.

    return JsonResponse({'error': 'Invalid request'})

# def process_text(request):
#     text = "i am apple"
#     tokens = word_tokenize(text)
#     analyzed_text = pos_tag(tokens)
#     print(f'Text: {text}')
#     print(f'Tokens: {tokens}')
#     print(f'Analyzed Text: {analyzed_text}')
    
#     return JsonResponse({'result': analyzed_text})