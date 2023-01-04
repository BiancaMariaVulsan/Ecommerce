from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Account, Customer


class AccountAdmin(UserAdmin):
    # make the password readonly
    list_display = ('email', 'first_name', 'last_name', 'username', 'last_login', 'date_joined', 'is_active')
    # enter the user details by clicking on user's name also
    list_display_links = ('email', 'first_name', 'last_name')
    readonly_fields = ('last_login', 'date_joined')
    ordering = ('-date_joined',)

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


class CustomerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email')


admin.site.register(Account, AccountAdmin)
admin.site.register(Customer, CustomerAdmin)
