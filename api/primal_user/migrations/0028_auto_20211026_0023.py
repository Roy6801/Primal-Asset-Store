# Generated by Django 3.2.7 on 2021-10-25 18:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('primal_user', '0027_alter_order_transactionid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='orderId',
        ),
        migrations.RemoveField(
            model_name='order',
            name='purchaseDate',
        ),
        migrations.RemoveField(
            model_name='order',
            name='success',
        ),
        migrations.RemoveField(
            model_name='order',
            name='transactionId',
        ),
        migrations.CreateModel(
            name='Downloads',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transactionId', models.CharField(blank=True, max_length=512)),
                ('success', models.BooleanField(default=False)),
                ('purchaseDate', models.DateField(auto_now_add=True)),
                ('orderId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='primal_user.order')),
            ],
        ),
    ]