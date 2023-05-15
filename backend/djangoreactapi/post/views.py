from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from django.http import HttpResponse

from .models import UserInfo, VocaInfo, VocaSentence, VocaWord, Scrapbook, ScrapbookContent
from .serializers import UserInfoSerializer, VocaInfoSerializer, VocaSentenceSerializer, VocaWordSerializer, ScrapbookContentSerializer, ScrapbookSerializer

# class ListPost(generics.ListCreateAPIView):
#     queryset = post.objects.all()
#     serializer_class = PostSerializer

# class DetailPost(generics.RetrieveUpdateDestroyAPIView):
#     queryset = post.objects.all()
#     serializer_class = PostSerializer



