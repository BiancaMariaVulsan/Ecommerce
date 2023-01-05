from django.urls import path, include
from .views import ProductView, ProductVariantView, VariantView
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'products', ProductView)
router.register(r'variants', ProductVariantView)

urlpatterns = [
    path('', include(router.urls)),
    path('variant/<int:id>', VariantView.as_view())
]