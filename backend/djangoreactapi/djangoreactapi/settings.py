from my_settings import SECRET_KEY
from pathlib import Path


# Build paths inside the project like this: BASE_DIR / "subdir".
BASE_DIR = Path(__file__).resolve().parent.parent


# SECURITY WARNING: keep the secret key used in production secret!

# SECURITY WARNING: don"t run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]

# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",        # dj_rest_auth의 registration 기능 사용을 위한
    
    # app 추가
    "WMVoca",

    # DRF
    "rest_framework",
    # dj_rest_auth 사용을 위해서 선행되어야 하는 app
    "rest_framework.authtoken",

    # token
    "rest_framework_simplejwt",
    # 위에꺼 아니면 이걸로 "rest_framework_simplejwt.token_blacklist",

    # dj-rest-auth
    "dj_rest_auth",
    "dj_rest_auth.registration",

    # django-allauth
    "allauth",
    "allauth.account",
    "allauth.socialaccount",

    # naver
    "allauth.socialaccount.providers.naver",


    # http접근제어 규약해제 명령어추가
    "corsheaders", 
]

# 사이트는 하나만 사용할 것이라는 명시
SITE_ID = 1

# user 앱에서 내가 설정한 User를 사용하겠다고 설정
AUTH_USER_MODEL = "WMVoca.User"

# dj_rest_auth.registration.views.SocialLoginView를 쓰기 위한 설정
# JWT를 사용하기위한 설정
REST_USE_JWT = True


from datetime import timedelta

# jwt 토큰은 simplejwt의 JWTAuthentication으로 인증한다.
REST_FRAMEWORK = {
    # 이거 소괄호인데 아래 원래 코드에서는 대괄호로 되어있음 혹시 오류나면 변경
    # 기본 인증에 대한 설정
    "DEFAULT_AUTHENTICATION_CLASSES": [
        # 아래는 다른 블로그에서 설정한거라 부딪힐까봐 주석처리...했는데 다른데 보면 또 이게 되어있고...
        # 메인으로 참고한 블로그에서 이게 설정이 안되어있는데 다른데서는 simplejwt 사용하려면 기본으로 다 깔아놔서 일단 주석해제함
        "rest_framework_simplejwt.authentication.JWTAuthentication",

        # dj_rest_auth 의 인증 절차 중 JWTCookieAuthentication을 사용
        "dj_rest_auth.jwt_auth.JWTCookieAuthentication",
     ],
     # 허가에 대한 설정
     "DEFAULT_PERMISSION_CLASSES": [
         # 인증이 완료된 사용자에 한해서 접근 허가
         "rest_framework.permission.IsAuthenticated",
     ]
}

# cookie key와 refresh cookie key의 이름을 설정
JWT_AUTH_COOKIE = "sociallogin-auth"
JWT_AUTH_REFRESH_COOKIE = "sociallogin-refresh-token"

# JWT 사용을 위한 설정
REST_USE_JWT = True

# simplejwt 에 대한 설정
SIMPLE_JWT = {
    # access token의 유효기한
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=1),
    # refresh token의 유효기한
    "REFRESH_TOKEN_LIFETIME": timedelta(days=2),
    # 토큰에 들어갈 알고리즘
    "ALGORITHM": "HS256",
    #토큰을 만드는데 사용할 secret key
    "SIGNING_KEY": SECRET_KEY,

    # 이전에 참고한 블로그 설정----------
    # "ROTATE_REFRESH_TOKENS": False,
    # "BLACKLIST_AFTER_ROTATION": True,
}
# ----------------------------




# rest 추가 후 기본 설정
# REST_FRAMEWORK = {
#     "DEFAULT_PERMISSION_CLASSES": [
#         "rest_framework.permissions.AllowAny",
#     ]
# }


# 이전에 참고한 블로그 설정 ------------
# ACCOUNT_USER_MODEL_USERNAME_FIELD = None # username 필드 사용 x
# ACCOUNT_EMAIL_REQUIRED = True            # email 필드 사용 o
# ACCOUNT_USERNAME_REQUIRED = False        # username 필드 사용 x
# ACCOUNT_AUTHENTICATION_METHOD = "email"


# 그외 참조한 블로그에서 있던 설정

# REST_FRAMEWORK = {
#     "DEFAULT_AUTHENTICATION_CLASSES": (
#         "rest_framework_simplejwt.authentication.JWTAuthentication",
#     )
# }



MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",     # http접근제어 규약해제 명령어추가
    "django.middleware.common.CommonMiddleware", # http접근제어 규약해제 명령어추가

    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "djangoreactapi.urls"


TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "djangoreactapi.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

import my_settings

DATABASES = my_settings.DATABASES

# SECRET_KEY = "django-insecure-%3q#eu9+m@rpi%a0su()g_xw86u8&5rlx(=84ezg9r#7cvm=9j"


# RDS Django 연동 pymysql 설치후 추가
import pymysql
pymysql.version_info = (1, 4, 3, "final", 0)
pymysql.install_as_MySQLdb()



# script안에서의 리소스 요청을 허용할 도메인 추가
# http제한해제 
CORS_ORIGIN_WHITELIST = [
    "https://localhost:3000",
    "https://127.0.0.1:3000",
]


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",},
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "ko-kr"

TIME_ZONE = "Asia/Seoul"

USE_I18N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "/static/"

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# # Google OAuth 관련 설정
# SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = "813909167375-nkh5gpit9r8f59cr8us9sr7pkqnuls0g.apps.googleusercontent.com"
# SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = "AIzaSyBeqDg4SiDQX2CnW3Sg5gTam3VOg7wzgA8"
# SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = ["email"]
# SOCIAL_AUTH_GOOGLE_OAUTH2_AUTH_EXTRA_ARGUMENTS = {"access_type": "offline"}