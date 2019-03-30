from projects.models import Project
from rest_framework import viewsets, permissions
from .serializers import ProjectSerializer

# Project Viewset


class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]

    serializer_class = ProjectSerializer

    def get_queryset(self):
        # return self.request.user.projects.all()
        return Project.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
