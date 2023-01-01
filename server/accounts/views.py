import ast
import json

import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response


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
    return Response(response.content.decode("utf-8"))


@api_view(['POST'])
def post_signup(request):
    querydictstr = request.body.decode('UTF-8')
    querydict = ast.literal_eval(querydictstr)
    response = requests.post('http://localhost:5100/api/Account/register', json=querydict)
    return Response(response.content.decode("utf-8"))
