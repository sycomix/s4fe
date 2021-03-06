# Generated by Django 2.2.12 on 2020-09-25 12:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('home', '0002_deviceinfo'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='serial',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='item',
            name='unique_identifier',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='trans_item', to='home.Item')),
                ('user_from', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='trans_user_from', to=settings.AUTH_USER_MODEL)),
                ('user_to', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='trans_user_to', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Transactions',
                'ordering': ('-created',),
            },
        ),
    ]
