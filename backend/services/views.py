from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .models import Service, Profile
from .serializers import ServiceSerializer, RegisterSerializer
# Create your views here.

#-------- Auth ---------#

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()

        # ✅ DO NOT create Profile again
        profile = Profile.objects.get(user=user)

        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'role': profile.role.strip().lower(),
            'username': user.username
        })

    return Response(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user:
        token, _ = Token.objects.get_or_create(user=user)

        role = 'guest'
        if user.is_superuser or user.is_staff:
            role = 'admin'
        else:
            profile = Profile.objects.filter(user=user).first()
            if profile:
                role = (profile.role or 'guest').strip().lower()

        return Response({
            'token': token.key,
            'role': role,          # ✅ always defined, never crashes
            'username': user.username,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser
        }, status=200)

    return Response({'error': 'Invalid Credentials'}, status=400)


def is_admin_user(user):
    if user.is_superuser or user.is_staff:
        return True
    try:
        return Profile.objects.get(user=user).role == 'admin'
    except Profile.DoesNotExist:
        return False
    
#--------   Services  -------

@api_view(['GET'])
@permission_classes([AllowAny])
def service_list(request):
    category = request.GET.get('category', '')
    location = request.GET.get('location', '')
    services = Service.objects.filter(status='approved')

    if category:
        services = services.filter(category__icontains = category)
    
    if location:
        services = services.filter(location__icontains = location)
    return Response(ServiceSerializer(services,many=True).data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_service(request):
    profile = Profile.objects.filter(user=request.user).first()
    if not profile or profile.role != 'provider':
        return Response({'error': 'Only Providers can post services'}, status=403)
    serializer = ServiceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(provider=request.user, status='pending')
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_services(request):
    services = Service.objects.filter(provider=request.user)
    return Response(ServiceSerializer(services, many=True).data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def approve_service(request, pk):
    if not is_admin_user(request.user):
        return Response({'error': 'Admin Only'}, status=403)
    try:
        service = Service.objects.get(pk=pk)
        service.status = request.data.get('status', 'approved')
        service.save()
        return Response({'message': f'Service {service.status}'})
    except Service.DoesNotExist:
        return Response({'Error': 'Not Found'}, status=404)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def pending_services(request):
    if not is_admin_user(request.user):
        return Response({'error': 'Admin Only'}, status = 403)
    services = Service.objects.filter(status='pending')
    return Response(ServiceSerializer(services, many=True).data)