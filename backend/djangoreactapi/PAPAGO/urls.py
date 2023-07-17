from django.urls import path
from . import views

app_name = 'PAPAGO'

urlpatterns = [
    path("PAPAGO/api/", views.main),
    # 다른 URL 패턴들을 추가로 설정할 수 있습니다.
]