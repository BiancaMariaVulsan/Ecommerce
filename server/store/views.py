from .models import Product, ProductVariant
from .serializers import ProductSerializer, ProductVariantSerializer
from rest_framework import viewsets


class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class ProductVariantView(viewsets.ModelViewSet):
    serializer_class = ProductVariantSerializer
    queryset = ProductVariant.objects.all()