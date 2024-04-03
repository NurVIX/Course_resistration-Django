from django.db import models
from django.contrib.auth.models import User


class Courses(models.Model):
    name = models.CharField(max_length=100)


class Enrollment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Courses, on_delete=models.CASCADE)
    enrollment_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [['student', 'course']]