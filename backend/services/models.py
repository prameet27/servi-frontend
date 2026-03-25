from django.db import models

# Create your models here.
class Service(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    description = models.TextField()
    rating = models.FloatField(default=0.0)
    reviews = models.IntegerField(default=0)
    price = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    image_url = models.URLField(blank=True)

    def __str__(self):
        return self.name
