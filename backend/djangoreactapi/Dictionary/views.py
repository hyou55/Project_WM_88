import re
import json
import requests
from bs4 import BeautifulSoup
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

<<<<<<< HEAD
# 웹 크롤링 함수
def search_dictionary_word(word):
    dic_url = f"http://dic.daum.net/search.do?q={word}"
    r = requests.get(dic_url)
    soup = BeautifulSoup(r.text, "html.parser")
    
    # Find the first 5 matching results
    result_means = soup.find_all(attrs={'class': 'list_search'})[:1]
    
    results = []
    for elem in result_means:
        result = elem.get_text().strip().replace('\n', ', ')
        results.append(result)
    
    return results

# 빈문자열에 대한 최대 5번의 웹 크롤링 시도
def try_crawling(word, max_attempts=5):
    for _ in range(max_attempts):
        results = search_dictionary_word(word)
        if results:
            return results
    return ["사전에 없음"]

@method_decorator(csrf_exempt, name='dispatch')
=======
@method_decorator(csrf_exempt, name="dispatch")
>>>>>>> 595493a253d77832ec959475c816ed105c55b594
def naver_dic(request):
    if request.method == "POST":
        data = json.loads(request.body)
        text = data.get("text", "")
        results = try_crawling(text)
        
<<<<<<< HEAD
        result_list = [[text, result] for result in results]
        return JsonResponse({"result": result_list})
    else:
        return JsonResponse({"error": "잘못된 요청"}, status=400)
=======
        r = requests.get(dic_url)
        soup = BeautifulSoup(r.text, "html.parser")
        result_means = soup.find_all(attrs={"class": "list_search"})
        result = [elem.get_text().strip().replace("\n", ", ") for elem in result_means if elem.get_text().strip()]
        
        return JsonResponse({"result": result})
    else:
        return JsonResponse({"error": "Invalid request"}, status=400)
    
    # if request.method == "POST":
    #     data = json.loads(request.body)
    #     text = data.get("text", "")
    #     #query_keyword = request.POST.get("keyword", ")
    #     dic_url = f"http://endic.naver.com/search.nhn?sLn=kr&dicQuery={text}&x=12&y=12&query={text}&target=endic&ie=utf8&query_utf=&isOnlyViewEE=N"
        
    #     r = requests.get(dic_url)
    #     soup = BeautifulSoup(r.text, "html.parser")
    #     result_means = soup.find_all(attrs={"class": "fnt_k05"})
    #     result = [elem.get_text().strip().replace("\n", ", ") for elem in result_means if elem.get_text().strip()]
        
    #     return JsonResponse({"result": result})
    # else:
    #     return JsonResponse({"error": "Invalid request"}, status=400)
>>>>>>> 595493a253d77832ec959475c816ed105c55b594
