from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .db import DB
import json

# Create your views here.

class Home(TemplateView):
    template_name = "base/base.html"

class Transact(APIView):
    
    def get(self, request, format=None):
        db = DB()
        context = {}
        list_data = {}

        data = json.dumps(request.GET) # Kani ang mas pabor kay no need na og cleaning
        context = json.loads(data)
        print(f"Data: {data}")
        print(f"Context:  {context}")
        list_data = db.fullcycle(data) # ang data variable ang ge use kaysa sa context
        
        print(f"List Data: {list_data}")

        return Response(list_data, status=status.HTTP_201_CREATED)