# Generated by Django 5.0.3 on 2024-03-28 17:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rent', '0005_rent_client_rent_friend'),
    ]

    operations = [
        migrations.RenameField(
            model_name='rent',
            old_name='client',
            new_name='client_id',
        ),
        migrations.RenameField(
            model_name='rent',
            old_name='friend',
            new_name='friend_id',
        ),
    ]
