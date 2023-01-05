from rest_framework import serializers

from accounts.models import Account, Customer
from checkout.models import Address, Order


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['userId', 'country', 'city', 'street', 'number', 'postcode']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'status', 'total', 'date']