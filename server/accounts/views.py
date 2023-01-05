import ast
import json

import requests
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from accounts.models import Customer
from accounts.serializers import CustomerSerializer


class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()

    def getIdByEmail(email):
        return Customer.objects.get(email=email)


@api_view(['GET'])
def get_roles(request):
    response = requests.get('http://localhost:5100/api/Role')
    print(response.content.decode("utf-8"))
    return Response(response.content.decode("utf-8"))


@api_view(['POST'])
def post_login(request):
    querydictstr = request.body.decode('UTF-8')
    querydict = ast.literal_eval(querydictstr)
    response = requests.post('http://localhost:5100/api/Account/login', json=querydict)
    responsedict = ast.literal_eval(response.content.decode("utf-8"))
    return Response({
        "id": responsedict['id'],
        "email": responsedict['email'],
        "userName": responsedict['userName'],
        "firstName": responsedict['firstName'],
        "lastName": responsedict['lastName'],
        "token": responsedict['token'],
        "role": {
            "id": responsedict['role']['id'],
            "name": responsedict['role']['name']
        }
    })


@api_view(['POST'])
def post_signup(request):
    querydictstr = request.body.decode('UTF-8')
    querydict = ast.literal_eval(querydictstr)
    response = requests.post('http://localhost:5100/api/Account/register', json=querydict)
    responsedict = ast.literal_eval(response.content.decode("utf-8"))
    print(responsedict)
    return Response({
        "id": responsedict['id'],
        "email": responsedict['email'],
        "userName": responsedict['userName'],
        "firstName": responsedict['firstName'],
        "lastName": responsedict['lastName'],
        "token": responsedict['token'],
        "role": {
            "id": responsedict['role']['id'],
            "name": responsedict['role']['name']
        }
    })
