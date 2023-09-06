from django.urls import include, path
from rest_framework import routers
from .views import UserInfoViewSet, VocaInfoViewSet, VocaSentenceViewSet, VocaWordViewSet, ScrapbookViewSet, ScrapbookContentViewSet

router = routers.DefaultRouter()
router.register(r"UserInfo", UserInfoViewSet)
router.register(r"vocainfo", VocaInfoViewSet)
router.register(r"vocasentence", VocaSentenceViewSet)
router.register(r"vocaword", VocaWordViewSet)
router.register(r"scrapbook", ScrapbookViewSet)
router.register(r"scrapbookcontent", ScrapbookContentViewSet)

urlpatterns = [
    path("", include(router.urls)),
]