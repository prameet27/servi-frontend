from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Service
from .serializers import ServiceSerializer
# Create your views here.

@api_view(['GET'])
def service_list(request):
    category = request.GET.get('category', '')
    location = request.GET.get('location', '')
    services = Service.objects.all()

    if category:
        services = services.filter(category__icontains = category)
    
    if location:
        services = services.filter(location__icontains = location)
    
    serializer = ServiceSerializer(services, many=True)
    return Response(serializer.data)