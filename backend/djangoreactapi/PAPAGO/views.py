# import os
# import sys
# import urllib.request
# from django.shortcuts import render
# from django.http import HttpResponse

# client_id = "lUmpXs3j1n6tF4ycqdrp" # 개발자센터에서 발급받은 Client ID 값
# client_secret = "pcjVJmRds5" # 개발자센터에서 발급받은 Client Secret 값

# def main(request):
#     # message = request.GET.get('abc')
#     # print(message)
    
#     encText = urllib.parse.quote("반갑습니다")
#     data = "source=ko&target=en&text=" + encText
#     url = "https://openapi.naver.com/v1/papago/n2mt"
#     request = urllib.request.Request(url)
#     request.add_header("X-Naver-Client-Id",client_id)
#     request.add_header("X-Naver-Client-Secret",client_secret)
#     response = urllib.request.urlopen(request, data=data.encode("utf-8"))
#     rescode = response.getcode()
    
#     if(rescode==200):
#         response_body = response.read()
#         # print(response_body.decode('utf-8'))
#         # return HttpResponse("안녕?")
#         return HttpResponse(response_body.decode('utf-8')) # 번역된 문장 표시
#     else:
#         print("Error Code:" + rescode)
#         return

# from django.shortcuts import render
# from django.http import HttpResponse

# import os
# import sys
# import urllib.request


# client_id = "lUmpXs3j1n6tF4ycqdrp" # 개발자센터에서 발급받은 Client ID 값
# client_secret = "pcjVJmRds5" # 개발자센터에서 발급받은 Client Secret 값

# def main(request):
#     message = request.GET.get('api')
#     encText = urllib.parse.quote(message)

#     data = "source=ko&target=en&text=" + encText
#     url = "https://openapi.naver.com/v1/papago/n2mt"
#     req = urllib.request.Request(url)
#     req.add_header("X-Naver-Client-Id", client_id)
#     req.add_header("X-Naver-Client-Secret", client_secret)
#     response = urllib.request.urlopen(req, data=data.encode("utf-8"))
#     rescode = response.getcode()
#     if rescode == 200:
#         response_body = response.read()
#         return HttpResponse(response_body.decode('utf-8'))
#     else:
#         print("Error Code: " + str(rescode))
#         return
    
# from django.shortcuts import render
# from django.http import HttpResponse

# def main(request):
#     message = request.GET.get('abc')
#     print(message)

#     return HttpResponse("안녕?")

# import os
# import sys
# import urllib.request
# import urllib.parse
# from django.shortcuts import render
# from django.http import HttpResponse

# client_id = "lUmpXs3j1n6tF4ycqdrp" # 개발자센터에서 발급받은 Client ID 값
# client_secret = "ttvQqE7dMc" # 개발자센터에서 발급받은 Client Secret 값

# def main(request):
#     message = request.POST.get('api', '')
#     print(message)
#     if message:
#         encText = urllib.parse.quote(message)
#         data = "source=ko&target=en&text=" + encText
#         url = "http://openapi.naver.com/v1/papago/n2mt"  # 'https' 대신 'http' 사용
#         req = urllib.request.Request(url)
#         req.add_header("X-Naver-Client-Id", client_id)
#         req.add_header("X-Naver-Client-Secret", client_secret)
#         response = urllib.request.urlopen(req, data=data.encode("utf-8"))
#         rescode = response.getcode()
#         if rescode == 200:
#             response_body = response.read()
#             return HttpResponse(response_body.decode('utf-8'), safe=True)  # safe 매개변수를 True로 설정
#         else:
#             print("Error Code: " + str(rescode))
#             return HttpResponse("번역 오류")
#     else:
#         return HttpResponse("안녕?")


# from django.shortcuts import render
# from django.http import HttpResponse

# def main(request):
#     message = request.GET.get('abc')
#     print(message)

#     return HttpResponse("안녕?")






# views.py
# from django.middleware.csrf import get_token
# from django.http import JsonResponse
# import requests
# from django.shortcuts import render

# # def get_csrf_token(request):
# #     csrf_token = get_token(request)
# #     return JsonResponse({'csrfToken': csrf_token})

# # 1. APP 등록 - access token
# CLIENT_ID, CLIENT_SECRET = 'lUmpXs3j1n6tF4ycqdrp', 'ttvQqE7dMc'

# def main(request):
#     if request.method == 'GET':
        
#         text = request.GET.get('text', '')
        
#         url = 'https://openapi.naver.com/v1/papago/n2mt'
#         headers = {
#             'Content-Type': 'application/json',
#             'X-Naver-Client-Id': CLIENT_ID,
#             'X-Naver-Client-Secret': CLIENT_SECRET
#         }
        
#         data = {'source': 'ko', 'target': 'en', 'text': text}
        
#         # 파파고 API 요청 보내기
#         response = requests.post(url, headers=headers, data=data)
        
#         # 응답 데이터 확인
#         if response.status_code == 200:
#             translated_text = response.json()['message']['result']['translatedText']
#             return JsonResponse({'translated_text': translated_text}, safe=False)
        
#     return JsonResponse({'error': 'Invalid request'}, status=400)








# # papago 번역 API 사용
# import requests
# import json
# from django.http import JsonResponse
# from django.shortcuts import render
 
# # 1. APP 등록 - access token
# CLIENT_ID, CLIENT_SECRET = 'lUmpXs3j1n6tF4ycqdrp', 'ttvQqE7dMc'
 
 
# def main(request):
#     # 2. request (en 외 언어로 번역도 가능)
#     text = '파이썬은 재미있습니다.'
#     url = 'https://openapi.naver.com/v1/papago/n2mt'
#     headers = {
#         'Content-Type': 'application/json',
#         'X-Naver-Client-Id': CLIENT_ID,
#         'X-Naver-Client-Secret': CLIENT_SECRET
#     }
#     data = {'source': 'ko', 'target': 'en', 'text': text}
    
#     # post 방식으로 서버 쪽으로 요청
#     response = requests.post(url, json.dumps(data), headers=headers) 
#     # print(response)  # 정상 응답인지 확인
    
#     # 3. response(en) -> en_txt
#     # print(response.text)  # 응답 출력 - 내용이 dictionary인 str
    
#     # json() 후 key 값을 사용하여 원하는 텍스트 접근
#     en_text = response.json()['message']['result']['translatedText']
#     return JsonResponse(en_text, safe=False)


from django.http import JsonResponse
import requests

CLIENT_ID = "lUmpXs3j1n6tF4ycqdrp"  # 네이버 Papago API 클라이언트 ID
CLIENT_SECRET = "ttvQqE7dMc"  # 네이버 Papago API 클라이언트 시크릿

def main(request):
    if request.method == "POST":
        text = request.POST.get("text", "")

        url = "https://openapi.naver.com/v1/papago/n2mt"
        headers = {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Naver-Client-Id": CLIENT_ID,
            "X-Naver-Client-Secret": CLIENT_SECRET,
        }
        data = {
            "source": "ko",
            "target": "en",
            "text": text,
        }

        response = requests.post(url, headers=headers, data=data)
        if response.status_code == 200:
            translated_text = response.json()["message"]["result"]["translatedText"]
            return JsonResponse({"translated_text": translated_text}, safe=False)

    return JsonResponse({"error": "Invalid request"}, status=400)