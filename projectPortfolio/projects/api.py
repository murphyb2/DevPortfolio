from projects.models import Project
from rest_framework import viewsets, permissions
from .serializers import ProjectSerializer

# Project Viewset


class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]

    # serializer_class = ProjectSerializer
    # def get_serializer_class(self):
    # print("self.action == " + self.action)
    # if self.action == 'retrieve':
    # We want the detail page for a project
    # return ProjectDetailSerializer
    # We want a list of all the projects
    serializer_class = ProjectSerializer

    # def get_queryset(self):
    # return self.request.user.projects.all()
    # if self.action == 'retrieve':
    # We want the detail page for a project
    # Project.objects.filter()
    # We want a list of all the projects
    queryset = Project.objects.all()

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)
