# Generated by Django 2.2.12 on 2020-09-25 12:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='unique_identifier',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
