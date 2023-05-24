
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
    "WMVoca", # app 추가
    "rest_framework", # rest 추가
    "corsheaders", # http접근제어 규약해제 명령어추가
]

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


# Google OAuth 관련 설정
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = "813909167375-nkh5gpit9r8f59cr8us9sr7pkqnuls0g.apps.googleusercontent.com"
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = "AIzaSyBeqDg4SiDQX2CnW3Sg5gTam3VOg7wzgA8"
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = ["email"]
SOCIAL_AUTH_GOOGLE_OAUTH2_AUTH_EXTRA_ARGUMENTS = {"access_type": "offline"}