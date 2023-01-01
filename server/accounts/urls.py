from django.urls import path

from accounts import views

urlpatterns = [
    path('roles/', views.get_roles, name='all_roles'),
]
