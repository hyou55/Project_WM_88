from django.contrib import admin
# models.py 추가
from .models import Post 

admin.site.register(Post)
