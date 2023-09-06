import json
from django.http import JsonResponse
import requests
import urllib.request
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

CLIENT_ID = "lUmpXs3j1n6tF4ycqdrp"  # 네이버 Papago API 클라이언트 ID
CLIENT_SECRET = "ttvQqE7dMc"  # 네이버 Papago API 클라이언트 시크릿

def langDetect(sentence):
    content = "query=" + sentence
    url = "https://openapi.naver.com/v1/papago/detectLangs"
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id",CLIENT_ID)
    request.add_header("X-Naver-Client-Secret",CLIENT_SECRET)
    response = urllib.request.urlopen(request, data=content.encode("utf-8"))
    rescode = response.getcode()
    if(rescode==200):
        response_body = response.read()
        lang = json.loads(response_body)
        return lang['langCode']
    else:
        print("Error Code:" + rescode)

@method_decorator(csrf_exempt, name='dispatch')
def main(request):
    if request.method == "POST":
        data = json.loads(request.body)
        text = data.get("text", "")

        lang_code = langDetect(text)

        url = "https://openapi.naver.com/v1/papago/n2mt"
        headers = {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Naver-Client-Id": CLIENT_ID,
            "X-Naver-Client-Secret": CLIENT_SECRET,
        }
        data = {
            "source": lang_code,
            "target": "ko",
            "text": text,
        }

        response = requests.post(url, headers=headers, data=data)
        if response.status_code == 200:
            translated_text = response.json()["message"]["result"]["translatedText"]
            return JsonResponse({"translated_text": translated_text, "lang_code": lang_code}, safe=False)

    return JsonResponse({"error": "Invalid request"}, status=400)