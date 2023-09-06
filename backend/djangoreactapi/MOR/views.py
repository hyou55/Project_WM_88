import json
import googletrans
from django.http import JsonResponse
from nltk import word_tokenize, pos_tag
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import nltk
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('averaged_perceptron_tagger')


# 겹치는 단어 없애고 순서대로 출력하기 위한
from collections import OrderedDict

# 심볼 제거용
import re

# 불용어 제거용
from nltk.corpus import stopwords

# 겹치는 단어 없애고 순서대로 출력하기 위한
from collections import OrderedDict

# 심볼 제거용
import re

# 불용어 제거용
from nltk.corpus import stopwords

@method_decorator(csrf_exempt, name='dispatch')
def process_text(request):
    if request.method == "POST":
        data = json.loads(request.body)
        text = data.get("text", "")

        # 불필요한 심볼 제거
        cleaned_content = re.sub(r'[^\.\?\!\w\d\s\[\]\{\}\(\)]','',text)

        # 대문자를 소문자로 전환
        lower_content = cleaned_content.lower()

        # 각 워드를 토큰으로 쪼갬
        tokens = word_tokenize(lower_content)

        # 단어 원형을 찾기 위해서 lemmatize를 하려면 각 단어의 품사정보를 알려줘야 정확한 결과가 나오기 때문에
        # 일일히 내가 품사 정보를 구분해서 알려줄 수 없으므로...
        # 만약에 일일히 안 알려주고 그냥 lemmatize하면 정확도가 떨어지는 이상한 결과가 나옴



        # 단어배열[]을 겹치는거 없고 순서없는 배열{}로 만듬
        stop_word_check = set(tokens)

        # 불용어 처리
        stop_words = stopwords.words("english")
        # 불용어 커스터마이즈 --------------------------------------
        stop_words.append("be")
        stop_words.append("is")
        stop_words.append("don't")
        # -----------------------------------------------------------------
        # 불용어 제거 - (for)토큰화된 단어들 중에서 (if)불용어를 발견하면 (while)해당 불용어가 단어 리스트 내에서 없어질 때까지 제거함
        for i in stop_word_check:
            if i in stop_words:
                while i in tokens:
                    tokens.remove(i)



        # 겹치는 단어 없애고(set) 다시 list화 하기
        only_words = OrderedDict.fromkeys(tokens)

        # 단어에 품사 태깅 - 이 과정을 거치면 ('단어', '품사'), ()... 이런식의 리스트로 변함
        analyzed_text = pos_tag(only_words)



        # 품사 구분해서 유효한 단어만 배열에 넣음
        word_tokens = []
        for word, tag in analyzed_text:
            if 'NN' in tag:
                word_tokens.append(word)
            elif 'VB' in tag:
                word_tokens.append(word)
            elif 'PDT' in tag:
                word_tokens.append(word)
            elif 'JJ' in tag:
                word_tokens.append(word)
            elif 'RP' in tag:
                word_tokens.append(word)            
            elif 'RB' in tag:
                word_tokens.append(word)

        # 명사만 추출하여 리스트에 저장
        # nouns = [word for word, pos in analyzed_text if pos.startswith('NN')]
        # verbs = [word for word, pos in analyzed_text if pos.startswith('VB')]
        # adverbs = [word for word, pos in analyzed_text if pos.startswith('RB')]
        
        # 배열 하나에 명사, 동사, 형용사 순서로 넣음
        # word_tokens = []
        # word_tokens.append(nouns)
        # word_tokens.append(verbs)
        # word_tokens.append(adverbs)

        # 각 단어들 번역하는 공간.
        # translator = googletrans.Translator()
        # result = []
        
        # for i, word in enumerate(nouns) :
        #     result[i] = translator.translate(nouns[i], dest='ko', src='en')
        
        return JsonResponse({'nouns': word_tokens}) # none 옆에 변수 하나 더 추가해서 데이터를 2개 보내도록.

    return JsonResponse({'error': 'Invalid request'})

# def process_text(request):
#     text = "i am apple"
#     tokens = word_tokenize(text)
#     analyzed_text = pos_tag(tokens)
#     print(f'Text: {text}')
#     print(f'Tokens: {tokens}')
#     print(f'Analyzed Text: {analyzed_text}')
    
#     return JsonResponse({'result': analyzed_text})