# # DB ORM 설정 코드 


# # django에서 제공하는 User 형식 대신에 내가 만든 USer를 사용하기 위한 것
# # from django.contrib.auth.models import AbstractUser

# # # 나중에 설정 바꿀 때 활성화
# # from django.contrib.auth.models import AbstractBaseUser

# # from django.conf import settings


# from django.contrib.auth.models import AbstractUser

# class UserInfo(AbstractUser):
#     user_id = models.AutoField(primary_key=True)
#     user_name = models.CharField(max_length=255)
#     user_email = models.EmailField()

#     REQUIRED_FIELDS = ['user_email']  # 필수 필드를 여기에 명시

#     class Meta:
#         db_table = "UserInfo"

# # 단어장 ORM
# class VocaInfo(models.Model):
#     v_user_id = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
#     voca_id = models.AutoField(primary_key=True)
#     voca_name = models.CharField(max_length=255)
#     voca_info = models.TextField()
#     word_num = models.IntegerField(default=0)
#     sentence_num = models.IntegerField(default=0)
    
#     class Meta:
#         db_table = "VOCAINFO"
    

# # 단어장에 저장된 문장 ORM
# class VocaSentence(models.Model):
#     s_voca_id = models.ForeignKey(VocaInfo, on_delete=models.CASCADE)
#     sentence_id = models.AutoField(primary_key=True)
#     sentence = models.TextField()
#     s_meaning = models.TextField()

#     class Meta:
#         db_table = "VOCASENTENCE"

# # 단어장에 저장한 단어 ORM
# class VocaWord(models.Model):
#     word_id = models.AutoField(primary_key=True)
#     w_voca_id = models.ForeignKey(VocaInfo, on_delete=models.CASCADE)
#     w_sentence_id = models.ForeignKey(VocaSentence, on_delete=models.CASCADE)
#     word = models.CharField(max_length=255)
#     w_meaning = models.TextField()
#     save_memory = models.BooleanField()

#     class Meta:
#         db_table = "VOCAWORD"


# # scapbook ORM
# class Scrapbook(models.Model):
#     sb_user_id = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
#     scrapbook_id = models.AutoField(primary_key=True)
#     scrapbook_name = models.CharField(max_length=255)
#     scrapbook_info = models.TextField()
#     content_num = models.IntegerField()

#     class Meta:
#         db_table = "SCRAPBOOK"

# # scrapbook 내부 ORM
# class ScrapbookContent(models.Model):
#     c_scrapbook_id = models.ForeignKey(Scrapbook, on_delete=models.CASCADE)
#     content_id = models.AutoField(primary_key=True)
#     content = models.TextField()
#     c_meaning = models.TextField()
    
#     class Meta:
#         db_table = "SCRAPBOOKCONTENT"    


# # # 자체 생성

# # class AuthGroup(models.Model):
# #     name = models.CharField(unique=True, max_length=150)        

# #     class Meta:
# #         managed = False
# #         db_table = "auth_group"


# # class AuthGroupPermissions(models.Model):
# #     id = models.BigAutoField(primary_key=True)
# #     group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
# #     permission = models.ForeignKey("AuthPermission", models.DO_NOTHING)

# #     class Meta:
# #         managed = False
# #         db_table = "auth_group_permissions"
# #         unique_together = (("group", "permission"),)


# # class AuthPermission(models.Model):
# #     name = models.CharField(max_length=255)
# #     content_type = models.ForeignKey("DjangoContentType", models.DO_NOTHING)
# #     codename = models.CharField(max_length=100)

# #     class Meta:
# #         managed = False
# #         db_table = "auth_permission"
# #         unique_together = (("content_type", "codename"),)       


# # class AuthUser(models.Model):
# #     password = models.CharField(max_length=128)
# #     last_login = models.DateTimeField(blank=True, null=True)    
# #     is_superuser = models.IntegerField()
# #     username = models.CharField(unique=True, max_length=150)    
# #     first_name = models.CharField(max_length=150)
# #     last_name = models.CharField(max_length=150)
# #     email = models.CharField(max_length=254)
# #     is_staff = models.IntegerField()
# #     is_active = models.IntegerField()
# #     date_joined = models.DateTimeField()

# #     class Meta:
# #         managed = False
# #         db_table = "auth_user"


# # class AuthUserGroups(models.Model):
# #     id = models.BigAutoField(primary_key=True)
# #     user = models.ForeignKey(AuthUser, models.DO_NOTHING)
# #     group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

# #     class Meta:
# #         managed = False
# #         db_table = "auth_user_groups"
# #         unique_together = (("user", "group"),)


# # class AuthUserUserPermissions(models.Model):
# #     id = models.BigAutoField(primary_key=True)
# #     user = models.ForeignKey(AuthUser, models.DO_NOTHING)
# #     permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

# #     class Meta:
# #         managed = False
# #         db_table = "auth_user_user_permissions"
# #         unique_together = (("user", "permission"),)


# # class DjangoAdminLog(models.Model):
# #     action_time = models.DateTimeField()
# #     object_id = models.TextField(blank=True, null=True)
# #     object_repr = models.CharField(max_length=200)
# #     action_flag = models.PositiveSmallIntegerField()
# #     change_message = models.TextField()
# #     content_type = models.ForeignKey("DjangoContentType", models.DO_NOTHING, blank=True, null=True)
# #     user = models.ForeignKey(AuthUser, models.DO_NOTHING)

# #     class Meta:
# #         managed = False
# #         db_table = "django_admin_log"


# # class DjangoContentType(models.Model):
# #     app_label = models.CharField(max_length=100)
# #     model = models.CharField(max_length=100)

# #     class Meta:
# #         managed = False
# #         db_table = "django_content_type"
# #         unique_together = (("app_label", "model"),)


# # class DjangoMigrations(models.Model):
# #     id = models.BigAutoField(primary_key=True)
# #     app = models.CharField(max_length=255)
# #     name = models.CharField(max_length=255)
# #     applied = models.DateTimeField()

# #     class Meta:
# #         managed = False
# #         db_table = "django_migrations"


# # class DjangoSession(models.Model):
# #     session_key = models.CharField(primary_key=True, max_length=40)
# #     session_data = models.TextField()
# #     expire_date = models.DateTimeField()

# #     class Meta:
# #         managed = False
# #         db_table = "django_session"


# # class PostPost(models.Model):
# #     id = models.BigAutoField(primary_key=True)
# #     sentence = models.TextField()
# #     meaning = models.TextField()

# #     class Meta:
# #         managed = False
# #         db_table = "post_post"
