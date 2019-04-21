from django.db import models
from django.contrib.auth.models import User


class Project(models.Model):
    name = models.CharField(max_length=200)
    url = models.URLField(max_length=200, unique=True)
    description = models.TextField(max_length=1000, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    cover_image = models.ImageField(upload_to='pictures/', null=True)
    inProgress = models.BooleanField(default=False)


class About(models.Model):
    description = models.TextField(max_length=500, blank=True)
    prof_pic = models.ImageField(upload_to='pictures/profilePic', null=True)

    def __str__(self):
        return ("About Page")
