from django.contrib import admin
from projects.models import Project


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'url', 'description', 'cover_image')


admin.site.register(Project, ProjectAdmin)
