from django.db import models

from store.models import ProductVariant


class Address(models.Model):
    userId = models.CharField(max_length=50, primary_key=True)
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=50)
    number = models.CharField(max_length=50)
    postcode = models.CharField(max_length=50)

    def create_address(userId, country, city, street, number, postcode):
        address = Address(userId=userId, country=country, city=city, street=street, number=number, postcode=postcode)
        address.save()
        return address


class Order(models.Model):
    customerId = models.ForeignKey(Address, on_delete=models.CASCADE)
    status = models.CharField(max_length=50)
    total = models.FloatField()
    date = models.DateTimeField(auto_now=True)

    def create_order(cust_id, status, total):
        order = Order(customerId=cust_id, status=status, total=total)
        order.save()


class CustomerProduct(models.Model):
    customerId = models.ForeignKey(Order, on_delete=models.CASCADE)
    productId = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
