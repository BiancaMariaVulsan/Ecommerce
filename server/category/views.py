import asyncio
from django.http import HttpResponse
from django.views import View


# class CategoryView(View):
#     def get(self, request, *args, **kwargs):
#         return HttpResponse("Hello async world!")
from rest_framework import viewsets

from category.models import Category
from category.serializers import CategorySerializer


class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
