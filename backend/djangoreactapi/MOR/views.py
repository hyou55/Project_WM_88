from django.http import JsonResponse
from nltk import word_tokenize, pos_tag

def analyze_text(request):
    if request.method == 'POST':
        text = request.POST.get('text', '')
        tokens = word_tokenize(text)  # 텍스트를 단어로 토큰화
        analyzed_text = pos_tag(tokens)  # 영어 형태소 분석 수행
        return JsonResponse({'result': analyzed_text})

# Create your views here.
