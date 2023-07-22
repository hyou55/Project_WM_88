import json
import requests
from bs4 import BeautifulSoup
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name="dispatch")
def naver_dic(request):
    if request.method == "POST":
        data = json.loads(request.body)
        text = data.get("text", "")
        dic_url = f"http://dic.daum.net/search.do?q={text}"
        
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