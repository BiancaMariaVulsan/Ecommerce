import permission as permission
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product, ProductVariant
from .serializers import ProductSerializer, ProductVariantSerializer
from rest_framework import viewsets, permissions


class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class ProductVariantView(viewsets.ModelViewSet):
    serializer_class = ProductVariantSerializer
    queryset = ProductVariant.objects.all()


class VariantView(APIView):
    http_method_names = ['get']
    permission_classes = (permissions.AllowAny,)
    serializer_class = ProductVariantSerializer

    def get(self, request, **kwargs):
        variant = ProductVariant.objects.get(id=kwargs["id"])
        return Response(variant)
