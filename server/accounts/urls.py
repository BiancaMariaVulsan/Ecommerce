from django.urls import path

from accounts import views

urlpatterns = [
    path('roles/', views.get_roles, name='all_roles'),
    path('login/', views.post_login, name='new_login'),
    path('signup/', views.post_signup, name='new_signup'),
]
