from django.urls import path, include
from rest_framework import routers

from accounts import views
from accounts.views import CustomerView

router = routers.DefaultRouter()
router.register(r'customers', CustomerView)

urlpatterns = [
    path('roles/', views.get_roles, name='all_roles'),
    path('login/', views.post_login, name='new_login'),
    path('signup/', views.post_signup, name='new_signup'),
    path('', include(router.urls)),
]
