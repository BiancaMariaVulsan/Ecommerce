from django.urls import path, include
from rest_framework import routers

from category.views import CategoryView

router = routers.DefaultRouter()
router.register(r'categories', CategoryView)

urlpatterns = [
    path('', include(router.urls))
]