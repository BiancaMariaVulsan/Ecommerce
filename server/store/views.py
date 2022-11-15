from .models import Product
from .serializers import ProductSerializer
from rest_framework import viewsets


class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()