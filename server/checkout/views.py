import ast

import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response

from accounts.models import Customer
from accounts.views import CustomerView


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


# @api_view(['POST'])
# def add_item(request):
#     querydictstr = request.body.decode('UTF-8')
#     querydict = ast.literal_eval(querydictstr)
#     cust_id = CustomerView.getIdByEmail(email=querydict['email']).customerId
#     requests.post('http://localhost:5300/api/Cart/' + cust_id + '/addItem', json=querydict)
#     return Response("Success")
#
#
# @api_view(['POST'])
# def remove_item(request):
#     querydictstr = request.body.decode('UTF-8')
#     querydict = ast.literal_eval(querydictstr)
#     cust_id = CustomerView.getIdByEmail(email=querydict['email']).customerId
#     requests.post('http://localhost:5300/api/Cart/' + cust_id + '/removeItem/' + querydict['id'], json=querydict)
#     return Response("Success")
#
#
# @api_view(['PUT'])
# def change_item(request):
#     querydictstr = request.body.decode('UTF-8')
#     querydict = ast.literal_eval(querydictstr)
#     requests.post('http://localhost:5300/api/Cart/' + querydict['email'] + '/change', json=querydict)
#     return Response("Success")
#
#
# @api_view(['GET'])
# def get_cart(request):
#     querydictstr = request.body.decode('UTF-8')
#     querydict = ast.literal_eval(querydictstr)
#     response = requests.get('http://localhost:5300/api/Cart/' + querydict['email'])
#     responsedict = ast.literal_eval(response.content.decode("utf-8"))
#     return Response({
#         {
#             "userId": responsedict['userId'],
#             "lineItems": responsedict['lineItems'],
#             "price": responsedict['price']
#         }
#     })
