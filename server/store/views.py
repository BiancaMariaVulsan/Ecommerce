import ast

from django.http import JsonResponse
from rest_framework.decorators import api_view

from .models import Product
from .serializers import ProductSerializer
from rest_framework import viewsets, status


class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()