from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Service, Profile


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    role = serializers.ChoiceField(
        choices=Profile.ROLE_CHOICES,
        write_only=True,
        default='guest'
    )

    phone = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=True
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role', 'phone']

    def validate(self, attrs):
        role = attrs.get('role', 'guest').strip().lower()
        phone = attrs.get('phone', '').strip()

        # Provider must have phone
        if role == 'provider' and not phone:
            raise serializers.ValidationError({
                'phone': 'Phone is required for providers.'
            })

        return attrs

    def create(self, validated_data):
        role = validated_data.pop('role', 'guest').strip().lower()

        if role not in ['guest', 'provider']:
            role = 'guest'

        phone = validated_data.pop('phone', '').strip()

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )

        Profile.objects.create(
            user=user,
            role=role,
            phone=phone if role == 'provider' else ''
        )

        return user


class ServiceSerializer(serializers.ModelSerializer):
    provider_name = serializers.CharField(source='provider.username', read_only=True)

    class Meta:
        model = Service
        fields = '__all__'
        read_only_fields = ['provider', 'status']