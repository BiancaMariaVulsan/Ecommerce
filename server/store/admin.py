from django.contrib import admin
from .models import Product


# class used to pre-populate the slug
class ProductAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('product_name',)}
    list_display = ('product_name', 'price', 'stock', 'category', 'modified_date', 'is_available')


admin.site.register(Product, ProductAdmin)
