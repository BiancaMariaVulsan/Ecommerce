from django.urls import path

from checkout import views

urlpatterns = [
    path('payment/', views.post_payment, name='new_payment'),
    path('customer/', views.register_customer, name='new_customer'),
]
