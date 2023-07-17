from django.urls import path
from . import views

urlpatterns = [
    path("", views.analyze_text, name="analze_text"),
]