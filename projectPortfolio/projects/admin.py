from django.contrib import admin
from projects.models import Project, About


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'url', 'description', 'cover_image')


admin.site.register(Project, ProjectAdmin)


class AboutAdmin(admin.ModelAdmin):
    list_display = ('prof_pic', 'description')


admin.site.register(About, AboutAdmin)
