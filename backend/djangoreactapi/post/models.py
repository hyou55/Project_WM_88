from django.db import models
#from django.conf import settings

# 사용자 ORM
class UserInfo(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=255)
    user_email = models.EmailField()

    class Meta:
        db_table = "USERINFO"

# 단어장 ORM
class VocaInfo(models.Model):
    v_user_id = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    voca_id = models.AutoField(primary_key=True)
    voca_name = models.CharField(max_length=255)
    voca_info = models.TextField()
    word_num = models.IntegerField()
    sentence_num = models.IntegerField()
    
    class Meta:
        db_table = "VOCAINFO"
    

# 단어장에 저장된 문장 ORM
class VocaSentence(models.Model):
    s_voca_id = models.ForeignKey(VocaInfo, on_delete=models.CASCADE)
    sentence_id = models.AutoField(primary_key=True)
    sentence = models.TextField()
    s_meaning = models.TextField()

    class Meta:
        db_table = "VOCASENTENCE"

# 단어장에 저장한 단어 ORM
class VocaWord(models.Model):
    word_id = models.AutoField(primary_key=True)
    w_voca_id = models.ForeignKey(VocaInfo, on_delete=models.CASCADE)
    w_sentence_id = models.ForeignKey(VocaSentence, on_delete=models.CASCADE)
    word = models.CharField(max_length=255)
    w_meaning = models.TextField()
    save_memory = models.BooleanField()

    class Meta:
        db_table = "VOCAWORD"


# scapbook ORM
class Scrapbook(models.Model):
    sb_user_id = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    scrapbook_id = models.AutoField(primary_key=True)
    scrapbook_name = models.CharField(max_length=255)
    scrapbook_info = models.TextField()
    content_num = models.IntegerField()

    class Meta:
        db_table = "SCRAPBOOK"

# scrapbook 내부 ORM
class ScrapbookContent(models.Model):
    c_scrapbook_id = models.ForeignKey(Scrapbook, on_delete=models.CASCADE)
    content_id = models.AutoField(primary_key=True)
    content = models.TextField()
    c_meaning = models.TextField()
    
    class Meta:
        db_table = "SCRAPBOOKCONTENT"    
