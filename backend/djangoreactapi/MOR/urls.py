from django.urls import path
from . import views

urlpatterns = [
    path("", views.process_text, name="process_text"),
]