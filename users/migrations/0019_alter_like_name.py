# Generated by Django 4.1.7 on 2024-04-27 20:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0018_alter_user_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='like',
            name='name',
            field=models.CharField(max_length=51),
        ),
    ]
