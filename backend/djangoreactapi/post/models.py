from django.db import models

class Post(models.Model):
    sentence = models.TextField()           # title 컬럼
    meaning = models.TextField()            # content 컬럼
    # 장고에서 기본으로 제공하는 auth app의 User 모델을 참조하도록 한 것 (블로그 참고)
  





    def __str__(self):
        """A string representation of the model."""
        return self.sentence

