from django.urls import path
from . import views

app_name = 'MOR'

urlpatterns = [
    path("", views.process_text),
]