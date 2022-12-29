from django.urls import path, include
from .views import ProductView, ProductVariantView
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'products', ProductView)
router.register(r'variants', ProductVariantView)

urlpatterns = [
    path('', include(router.urls)),
]