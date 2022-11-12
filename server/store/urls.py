from django.urls import path, include
from .views import ProductView
from rest_framework import routers

router = routers.DefaultRouter()
router.register('products', ProductView)

urlpatterns = [
    path('', include(router.urls)),
]