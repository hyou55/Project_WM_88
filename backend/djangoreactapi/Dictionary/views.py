import re
import json
import requests
from bs4 import BeautifulSoup
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# 웹 크롤링 함수
def search_dictionary_word(word):
    dic_url = f"http://dic.daum.net/search.do?q={word}"
    r = requests.get(dic_url)
    soup = BeautifulSoup(r.text, "html.parser")
    result_means = soup.find_all(attrs={'class': 'list_search'})
    result = [elem.get_text().strip().replace('\n', ', ') for elem in result_means if elem.get_text().strip()]
    return result

# 사전 검색을 재귀적으로 수행하는 함수
def recursive_search(words, index):
    if index >= len(words):
        return words

    word, result = words[index]

    if not result:
        new_result = search_dictionary_word(word)
        words[index][1] = new_result
        return recursive_search(words, index + 1)

    # 새로운 배열로 재귀 호출하여 수정된 결과 유지
    return recursive_search(words[:], index + 1)

@method_decorator(csrf_exempt, name='dispatch')
def naver_dic(request):
    if request.method == "POST":
        data = json.loads(request.body)
        text = data.get("text", "")
        dic_url = f"http://dic.daum.net/search.do?q={text}"
        
        r = requests.get(dic_url)
        soup = BeautifulSoup(r.text, "html.parser")
        result_means = soup.find_all(attrs={'class': 'list_search'})
        result = [elem.get_text().strip().replace('\n', ', ') for elem in result_means if elem.get_text().strip()]
        
        # 사전 검색 결과가 빈 문자열인 경우 재귀적으로 사전 검색을 수행
        words = [[word, ""] for word in result]
        words = recursive_search(words, 0)
        
        return JsonResponse({"result": words})
    else:
        return JsonResponse({"error": "잘못된 요청"}, status=400)