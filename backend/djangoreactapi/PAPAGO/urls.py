from django.urls import path
from . import views

urlpatterns = [
    path("", views.main, name="main"),
    # 다른 URL 패턴들을 추가로 설정할 수 있습니다.
]