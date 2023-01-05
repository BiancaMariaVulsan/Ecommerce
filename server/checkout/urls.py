from django.urls import path, include
from rest_framework import routers

from checkout import views
from checkout.views import OrderView, AddressView

router = routers.DefaultRouter()
router.register(r'allorders', OrderView)
router.register(r'address', AddressView)

urlpatterns = [
    path('payment/', views.post_payment, name='new_payment'),
    path('customer/', views.register_customer, name='new_customer'),
    path('order/', views.post_order, name='new_order'),
    path('', include(router.urls)),
]
