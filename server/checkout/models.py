from django.db import models

from store.models import ProductVariant


class Address(models.Model):
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=50)
    number = models.CharField(max_length=50)
    postcode = models.CharField(max_length=50)

    def create_address(country, city, street, number, postcode):
        address = Address(country=country, city=city, street=street, number=number, postcode=postcode)
        address.save()


class Order(models.Model):
    customerId = models.CharField(max_length=50)
    addressId = models.ForeignKey(Address, on_delete=models.CASCADE)
    status = models.CharField(max_length=50)
    total = models.FloatField()
    date = models.DateTimeField(auto_now=True)

    def create_order(cust_id, addressId, status, total):
        customer = Order(customerId=cust_id, addressId=addressId, status=status, total=total)
        customer.save()


class CustomerProduct(models.Model):
    customerId = models.ForeignKey(Order, on_delete=models.CASCADE)
    productId = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
