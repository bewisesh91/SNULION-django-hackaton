# Generated by Django 3.2.5 on 2021-07-23 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appCodingNote', '0005_auto_20210722_1604'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='note_link_title',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='note',
            name='note_name',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='tag',
            name='tag_name',
            field=models.CharField(max_length=100),
        ),
    ]
