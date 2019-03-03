from rest_framework import serializers
from projects.models import Project

# Project serializer


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
