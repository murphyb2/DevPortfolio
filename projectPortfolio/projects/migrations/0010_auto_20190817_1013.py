# Generated by Django 2.2.3 on 2019-08-17 14:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0009_project_short_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='short_title',
            field=models.CharField(max_length=12, null=True),
        ),
    ]
