# Generated by Django 4.1.7 on 2024-04-20 00:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notificacionesInterno', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='notificacioninterno',
            name='is_reading',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
