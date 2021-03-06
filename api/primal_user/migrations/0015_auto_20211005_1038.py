# Generated by Django 3.2.7 on 2021-10-05 05:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('primal_user', '0014_auto_20210926_1820'),
    ]

    operations = [
        migrations.AddField(
            model_name='asset',
            name='currency',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AlterField(
            model_name='asset',
            name='price',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='asset',
            name='uploaded',
            field=models.CharField(blank=True, max_length=512),
        ),
    ]
