from rest_framework import serializers, fields
from rest_framework.serializers import ImageField
from projects.models import Project

# Project serializer


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project

        fields = (
            'id',
            'name',
            'url',
            'description',
            'cover_image'
        )

# # Project Detail Serializer


# class ProjectDetailSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Project
#         depth = 1
#         fields = (
#             'id',
#             'name',
#             'url',
#             'description',
#             'cover_image',
#         )
