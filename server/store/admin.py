from django.contrib import admin
from .models import Product, ProductVariant


# class used to pre-populate the slug
class ProductAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
    list_display = ('id', 'name', 'price', 'category', 'modified_date', 'is_available')


class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ('id', 'parent_id', 'size', 'color', 'stock')


admin.site.register(Product, ProductAdmin)
admin.site.register(ProductVariant, ProductVariantAdmin)
