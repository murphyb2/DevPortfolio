# Generated by Django 2.1.7 on 2019-03-31 21:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0003_project_cover_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='owner',
        ),
    ]
