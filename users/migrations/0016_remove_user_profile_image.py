# Generated by Django 4.1.7 on 2024-04-25 03:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0015_merge_20240424_2237'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='profile_image',
        ),
    ]
