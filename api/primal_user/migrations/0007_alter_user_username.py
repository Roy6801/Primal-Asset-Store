# Generated by Django 3.2.5 on 2021-09-09 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('primal_user', '0006_alter_plans_quota'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='userName',
            field=models.CharField(max_length=512),
        ),
    ]