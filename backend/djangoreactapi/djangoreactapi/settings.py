
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / "subdir".
BASE_DIR = Path(__file__).resolve().parent.parent


# SECURITY WARNING: keep the secret key used in production secret!

# SECURITY WARNING: don"t run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["localhost", "127.0.0.1"]


# 인증 정보, 쿠키에 대한 설정
# CSRF_COOKIE_NAME = 'csrftoken'

CSRF_COOKIE_SECURE = False

CSRF_TRUSTED_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000", ]

"http://%2A.merkl.it/"

# CSRF_COOKIE_PATH = '/' 

# CSRF_COOKIE_DOMAIN = None

# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    
    ###########################################################
    
    "WMVoca", # app 추가
    "PAPAGO",
    "rest_framework", # rest 추가
    "corsheaders",# http접근제어 규약해제 명령어추가
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",     # http접근제어 규약해제 명령어추가
    "django.middleware.common.CommonMiddleware", # http접근제어 규약해제 명령어추가
   
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    # "django.middleware.csrf.CsrfViewMiddleware",
    "django.middleware.common.CommonMiddleware",
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

SECRET_KEY = "django-insecure-%3q#eu9+m@rpi%a0su()g_xw86u8&5rlx(=84ezg9r#7cvm=9j"


# RDS Django 연동 pymysql 설치후 추가
import pymysql
pymysql.version_info = (1, 4, 3, "final", 0)
pymysql.install_as_MySQLdb()



# rest 추가
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
    "rest_framework.permissions.AllowAny",
    ]
}

# 특정 도메인에서 오는 리소스 요청을 허용
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:3000",
# ]

# script안에서의 리소스 요청을 허용할 도메인 추가
# http제한해제 
CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

#  웹 애플리케이션이 다른 출처에 대한 리소스 요청 시 인증 정보(예: 쿠키, HTTP 인증)를 함께 전송하는지에 대한 허용여부
CORS_ALLOW_CREDENTIALS = True

# 웹 애플리케이션이 모든 출처에서의 리소스 요청을 허용할지 여부를 결정
CORS_ORIGIN_ALLOW_ALL = True

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


# Google OAuth 관련 설정
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = "813909167375-nkh5gpit9r8f59cr8us9sr7pkqnuls0g.apps.googleusercontent.com"
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = "AIzaSyBeqDg4SiDQX2CnW3Sg5gTam3VOg7wzgA8"
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = ["email"]
SOCIAL_AUTH_GOOGLE_OAUTH2_AUTH_EXTRA_ARGUMENTS = {"access_type": "offline"}