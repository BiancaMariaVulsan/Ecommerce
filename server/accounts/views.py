import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def get_roles(request):
    response = requests.get('http://localhost:5100/api/Role')
    print(response.content.decode("utf-8"))
    return Response(response.content.decode("utf-8"))