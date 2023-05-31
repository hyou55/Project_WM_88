DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "wm88db",  # DB name RDS 인스턴스 설정에 있는 '그냥' DB 이름
        "USER": "admin",  # DB user
        "PASSWORD": "whybinc2k!",  # DB account's password
        "HOST": "mywm88.czssdtqolbnx.ap-northeast-2.rds.amazonaws.com",  # RDS end point
        "PORT": "3306",  # DB port(normally 3306)
    }
}

# SECRET_KEY = "django-insecure-%3q#eu9+m@rpi%a0su()g_xw86u8&5rlx(=84ezg9r#7cvm=9j"
