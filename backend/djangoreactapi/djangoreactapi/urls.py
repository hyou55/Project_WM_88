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
    path("api/PAPAGO/", include("PAPAGO.urls")),
    path("api/WMVoca/", include("WMVoca.urls")),
    path("api/process_text/", include("MOR.urls")),
    path("api/Dictionary/", include("Dictionary.urls")),
    # path("app/", include("WMVoca.urls")), # 추가

    # # 구글 패스
    # path("auth/google/", views.google_auth, name="google-auth"),
    # path("auth/google/callback/", views.google_auth_callback, name="google-auth-callback"),
]

    # 추가 
    # path("app/", include("WMVoca.urls")), 