from django.db import migrations, models
class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
        ("accounts", "0001_initial"),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name="customuser",
            name="phone",
            field=models.CharField(blank=True, max_length=15),
        ),
        migrations.AddField(
            model_name="customuser",
            name="profile_image",
            field=models.ImageField(blank=True, null=True, upload_to="profiles/"),
            model_name='customuser',
            name='phone',
            field=models.CharField(blank=True, max_length=15),
        ),
        migrations.AddField(
            model_name='customuser',
            name='profile_image',
            field=models.ImageField(blank=True, null=True, upload_to='profiles/'),

        ),
    ]
