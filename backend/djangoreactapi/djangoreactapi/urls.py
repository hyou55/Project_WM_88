from django.contrib import admin
from django.urls import path, include


# 구글 패스로 추가
# from django.urls import path
# from WMVoca.views import *

urlpatterns = [ 
    path("admin/", admin.site.urls),
    path("api/WMVoca/", include("allauth.urls")),
    
    #path("api/WMVoca/", include("WMVoca.urls")),
    # 파파고 
    path("", include("PAPAGO.urls")),

    # 추가 
    # path("app/", include("WMVoca.urls")), 

 ]

