from django.contrib import admin
from .models import Category


class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('category_name',)}
    # set the fields that will appear on the category page
    list_display = ('category_name', 'slug')


admin.site.register(Category, CategoryAdmin)
