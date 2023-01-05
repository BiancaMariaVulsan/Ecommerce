from django.urls import path

from checkout import views

urlpatterns = [
    path('payment/', views.post_payment, name='new_payment'),
    path('customer/', views.register_customer, name='new_customer'),

    # path('add/', views.add_item, name='add_item'),
    # path('remove/', views.remove_item, name='remove_item'),
    # path('change/', views.change_item, name='change_item'),
    # path('cart/', views.get_cart, name='get_cart'),
]
