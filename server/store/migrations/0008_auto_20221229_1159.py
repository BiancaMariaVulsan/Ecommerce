# Generated by Django 3.2.16 on 2022-12-29 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0007_auto_20221229_1118'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='productvariant',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]