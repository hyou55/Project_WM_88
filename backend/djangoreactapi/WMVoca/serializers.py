from rest_framework import serializers
from .models import UserInfo, VocaInfo, VocaSentence, VocaWord, Scrapbook, ScrapbookContent


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = "__all__"

class VocaInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VocaInfo
        fields = "__all__"


class VocaSentenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = VocaSentence
        fields = "__all__"


class VocaWordSerializer(serializers.ModelSerializer):
    class Meta:
        model = VocaWord
        fields = "__all__"


class ScrapbookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scrapbook
        fields = "__all__"


class ScrapbookContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScrapbookContent
        fields = "__all__"