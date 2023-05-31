from django.shortcuts import render

import os
import sys
import urllib.request
from django.shortcuts import render
from django.http import HttpResponse

client_id = "lUmpXs3j1n6tF4ycqdrp" # 개발자센터에서 발급받은 Client ID 값
client_secret = "pcjVJmRds5" # 개발자센터에서 발급받은 Client Secret 값

def main(request):
    # message = request.GET.get('abc')
    # print(message)
    
    encText = urllib.parse.quote("반갑습니다")
    data = "source=ko&target=en&text=" + encText
    url = "https://openapi.naver.com/v1/papago/n2mt"
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id",client_id)
    request.add_header("X-Naver-Client-Secret",client_secret)
    response = urllib.request.urlopen(request, data=data.encode("utf-8"))
    rescode = response.getcode()
    
    if(rescode==200):
        response_body = response.read()
        # print(response_body.decode('utf-8'))
        # return HttpResponse("안녕?")
        return HttpResponse(response_body.decode('utf-8')) # 번역된 문장 표시
    else:
        print("Error Code:" + rescode)
        return
        
        



