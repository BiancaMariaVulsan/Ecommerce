from rest_framework import serializers
from .models import Product, ProductVariant


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'imageFirstURL', 'imageSecondURL', 'isOnSale', 'price',
                  'likes', 'nrOfTimesOrdered', 'description', 'category']


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'parent_id', 'color', 'size', 'stock']
