# Generated by Django 3.2.16 on 2022-12-11 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_auto_20221211_1936'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='size',
            field=models.CharField(default='L Large', max_length=50),
        ),
    ]