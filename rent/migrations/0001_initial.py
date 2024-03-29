# Generated by Django 5.0.3 on 2024-03-28 21:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id_event', models.IntegerField(primary_key=True, serialize=False)),
                ('type_event', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='OutFit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type_outfit', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='OutFit_Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rent.event')),
                ('id_outFit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rent.outfit')),
            ],
        ),
        migrations.CreateModel(
            name='Rent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_cita', models.DateField()),
                ('time', models.TimeField()),
                ('duration', models.FloatField()),
                ('location', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=200)),
                ('create', models.DateTimeField(auto_now_add=True)),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.client')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rent.event')),
                ('friend', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.friend')),
            ],
        ),
    ]
