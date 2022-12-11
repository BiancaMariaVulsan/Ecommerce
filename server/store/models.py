from django.db import models

from category.models import Category


class Product(models.Model):
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(max_length=500, blank=True)
    price = models.FloatField()
    # images = models.ImageField(upload_to='photos/products')
    imageFirstURL = models.CharField(max_length=200)
    imageSecondURL = models.CharField(max_length=200)
    isOnSale = models.BooleanField(default=False)
    stock = models.IntegerField(default=0)
    is_available = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    color = models.CharField(max_length=50, default='red')
    size = models.CharField(max_length=50, default='L Large')

    def __str__(self):
        return self.name
