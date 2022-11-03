import asyncio
from django.http import HttpResponse
from django.views import View


class CategoryView(View):
    def get(self, request, *args, **kwargs):
        return HttpResponse("Hello async world!")