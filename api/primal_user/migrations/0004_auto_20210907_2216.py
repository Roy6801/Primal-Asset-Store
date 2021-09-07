# Generated by Django 3.2.5 on 2021-09-07 16:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('primal_user', '0003_remove_user_planid'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='planId',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='primal_user.plans'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='plans',
            name='planId',
            field=models.CharField(default='DEFAULT VALUE', max_length=10, primary_key=True, serialize=False),
        ),
    ]
