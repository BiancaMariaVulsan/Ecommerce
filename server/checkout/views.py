import ast

import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response

from accounts.models import Customer
from accounts.views import CustomerView
from checkout.models import Address, Order


@api_view(['POST'])
def post_payment(request):
    querydictstr = request.body.decode('UTF-8')
    querydict = ast.literal_eval(querydictstr)
    email = querydict['email']
    cust_id = CustomerView.getIdByEmail(email=email).customerId
    req = {
        "customerId": cust_id,
        "receiptEmail": querydict['email'],
        "description": "stripe payment",
        "currency": "RON",
        "amount": querydict['amount']
    }
    response = requests.post('http://localhost:5200/api/Payment', json=req)
    responsedict = ast.literal_eval(response.content.decode("utf-8"))
    print(responsedict)
    return Response({
        "customerId": responsedict['customerId'],
        "receiptEmail": responsedict['receiptEmail'],
        "description": responsedict['description'],
        "currency": responsedict['currency'],
        "amount": responsedict['amount'],
        "paymentId": responsedict['paymentId']
    })


@api_view(['POST'])
def register_customer(request):
    """ register customer to stripe db if it is his first order """
    querydictstr = request.body.decode('UTF-8')
    querydict = ast.literal_eval(querydictstr)
    req = {
        "email": querydict['email'],
        "name": querydict['name'],
        "creditCard": {
            "name": querydict['name'],
            "cardNumber": querydict['card_number'],
            "expirationYear": querydict['expirationYear'],
            "expirationMonth": querydict['expirationMonth'],
            "cvc": querydict['cvc']
        }
    }
    response = requests.post('http://localhost:5200/api/Customer', json=req)
    responsedict = ast.literal_eval(response.content.decode("utf-8"))
    Customer.create_customer(responsedict['customerId'], responsedict['name'], responsedict['email'])
    print(responsedict)
    return Response("Success")


def getAddressId():
    pass

@api_view(['POST'])
def post_order(request):
    querydictstr = request.body.decode('UTF-8')
    querydict = ast.literal_eval(querydictstr)
    Address.create_address(querydict['address']['country'], querydict['address']['city'], querydict['address']['street'], querydict['address']['number'], querydict['address']['postcode'])
    Order.create_order(querydict['userId'], 1, querydict['status'], querydict['total'])