from django.shortcuts import render


from rest_framework import viewsets
from .models import UserInfo, VocaInfo, VocaSentence, VocaWord, Scrapbook, ScrapbookContent
from .serializers import UserInfoSerializer, VocaInfoSerializer, VocaSentenceSerializer, VocaWordSerializer, ScrapbookSerializer, ScrapbookContentSerializer

# # 구글 설정
# from django.shortcuts import redirect
# from social_django.utils import psa
# ---------

# # 각각 함수기반 뷰 예시
# from django.shortcuts import render
# from django.http import HttpResponse

# def home(request):
#     return HttpResponse("Hello, world!")

# def about(request):
#     return render(request, 'about.html')

# 클래스 기반 뷰 예시
# from django.views import View
# from django.http import HttpResponse

# class HomeView(View):
#     def get(self, request):
#         return HttpResponse("Hello, world!")

# class AboutView(View):
#     def get(self, request):
#         return HttpResponse("About page")


# 구글 설정
# @psa('social:begin')
# def google_auth(request):
#     return redirect('social:begin', backend='google-oauth2')

# @psa('social:complete')
# def google_auth_callback(request):
#     return redirect('your-redirect-url')
# # ----------


class UserInfoViewSet(viewsets.ModelViewSet):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer


class VocaInfoViewSet(viewsets.ModelViewSet):
    queryset = VocaInfo.objects.all()
    serializer_class = VocaInfoSerializer


class VocaSentenceViewSet(viewsets.ModelViewSet):
    queryset = VocaSentence.objects.all()
    serializer_class = VocaSentenceSerializer


class VocaWordViewSet(viewsets.ModelViewSet):
    queryset = VocaWord.objects.all()
    serializer_class = VocaWordSerializer


class ScrapbookViewSet(viewsets.ModelViewSet):
    queryset = Scrapbook.objects.all()
    serializer_class = ScrapbookSerializer


class ScrapbookContentViewSet(viewsets.ModelViewSet):
    queryset = ScrapbookContent.objects.all()
    serializer_class = ScrapbookContentSerializer
