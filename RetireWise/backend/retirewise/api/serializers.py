# api/serializers.py 
from rest_framework import serializers
from .models import ExpenseModel
from .models import CategoryModel
from .models import IncomeModel
class ExpenseModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseModel
        fields = '__all__'

class CategoryModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryModel
        fields = '__all__'

class IncomeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncomeModel
        fields = '__all__'