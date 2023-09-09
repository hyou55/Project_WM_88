from django.shortcuts import render


from rest_framework import viewsets
from .models import UserInfo, VocaInfo, VocaSentence, VocaWord, Scrapbook, ScrapbookContent
from .serializers import UserInfoSerializer, VocaInfoSerializer, VocaSentenceSerializer, VocaWordSerializer, ScrapbookSerializer, ScrapbookContentSerializer



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