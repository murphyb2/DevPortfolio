from projects.models import Project
from rest_framework import viewsets, permissions
from .serializers import ProjectSerializer

# Project Viewset


class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]
    serializer_class = ProjectSerializer

    queryset = Project.objects.all()
