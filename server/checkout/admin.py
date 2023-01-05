from django.contrib import admin

from checkout.models import Address, Order, CustomerProduct


class AddressAdmin(admin.ModelAdmin):
    list_display = ('id', 'city', 'country')


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customerId', 'addressId', 'total', 'date')


class CustomerProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'customerId', 'productId')


admin.site.register(Address, AddressAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(CustomerProduct, CustomerProductAdmin)
