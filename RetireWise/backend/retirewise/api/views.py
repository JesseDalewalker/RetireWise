from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import ExpenseModel, CategoryModel, IncomeModel
from .serializers import ExpenseModelSerializer, CategoryModelSerializer, IncomeModelSerializer
from datetime import datetime, timedelta

class SaveExpense(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        try:
            if request.data['id'] == None:
                expense_model_serializer = ExpenseModelSerializer(data=request.data)
                if expense_model_serializer.is_valid():
                    expense_model_serializer.save()
                    latest_expense = ExpenseModel.objects.last()
                    expense_model_serializer = ExpenseModelSerializer(latest_expense, many=False)
                    user_message = 'Success saving expense'
                    print(user_message)
                    return Response(expense_model_serializer.data, status=status.HTTP_201_CREATED)
            elif request.data['id'] != None:
                expense_id = request.data['id']
                instance = ExpenseModel.objects.get(id=expense_id)
                expense_model_serializer = ExpenseModelSerializer(instance, request.data)
                print(request.data)
                if expense_model_serializer.is_valid():
                    expense_model_serializer.save()
                    user_message = 'Success editing expense'
                    print(user_message)
                    return Response(expense_model_serializer.data, status=status.HTTP_201_CREATED)
        except:
            user_message = "Error saving expense"
            return Response(user_message, status=status.HTTP_400_BAD_REQUEST)
# Get a single expense
class GetExpense(APIView):
    def post(self, request, *args, **kwargs):
        try:
            expense_id = request.data
            expense = ExpenseModel.objects.get(id=expense_id)
            expense_model_serializer = ExpenseModelSerializer(expense, many=False)
            user_message = 'Success getting expense'
            print(user_message)
            return Response(expense_model_serializer.data, status=status.HTTP_201_CREATED)
        except:
            user_message = 'Error getting expense'
            print(user_message)
            return Response(user_message, status=status.HTTP_400_BAD_REQUEST)
        
class ViewExpenses(APIView):
    def get(self, request, *args, **kwargs):
        try:
            expenses = ExpenseModel.objects.all()
            expense_model_serializer = ExpenseModelSerializer(expenses, many=True)
            user_message = 'Success getting expenses'
            print(user_message)
            return Response(expense_model_serializer.data, status=status.HTTP_201_CREATED)
        except:
            user_message = 'Error getting expenses'
        return Response(user_message, status=status.HTTP_400_BAD_REQUEST)
    
# Delete a single expense
class DeleteExpense(APIView):
    def post(self, request, *args, **kwargs):
        try:
            expense_id = request.data
            expense = ExpenseModel.objects.get(id=expense_id)
            expense_model_serializer = ExpenseModelSerializer(expense, many=False)
            expense.delete()
            user_message =  'Success deleting expense'
            print(user_message)
            return Response(expense_model_serializer.data, status=status.HTTP_201_CREATED)
        except:
            user_message = 'Error deleting expense'
            print(user_message)
            return Response(user_message, status=status.HTTP_400_BAD_REQUEST)
        
class SaveIncome(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        try:
            if request.data['id'] == None:
                income_model_serializer = IncomeModelSerializer(data=request.data)
                if income_model_serializer.is_valid():
                    income_model_serializer.save()
                    latest_income = IncomeModel.objects.last()
                    income_model_serializer = IncomeModelSerializer(latest_income, many=False)
                    user_message = 'Success saving income'
                    print(user_message)
                    return Response(income_model_serializer.data, status=status.HTTP_201_CREATED)
            elif request.data['id'] != None:
                income_id = request.data['id']
                instance = IncomeModel.objects.get(id=income_id)
                income_model_serializer = IncomeModelSerializer(instance, request.data)
                print(request.data)
                if income_model_serializer.is_valid():
                    income_model_serializer.save()
                    user_message = 'Success editing income'
                    print(user_message)
                    return Response(income_model_serializer.data, status=status.HTTP_201_CREATED)
        except:
            user_message = "Error saving income"
            return Response(user_message, status=status.HTTP_400_BAD_REQUEST)
# Get a single income
class GetIncome(APIView):
    def post(self, request, *args, **kwargs):
        try:
            income_id = request.data
            income = IncomeModel.objects.get(id=income_id)
            income_model_serializer = IncomeModelSerializer(income, many=False)
            user_message = 'Success getting income'
            print(user_message)
            return Response(income_model_serializer.data, status=status.HTTP_201_CREATED)
        except:
            user_message = 'Error getting income'
            print(user_message)
            return Response(user_message, status=status.HTTP_400_BAD_REQUEST)
        
class ViewIncomes(APIView):
    def get(self, request, *args, **kwargs):
        try:
            incomes = IncomeModel.objects.all()
            income_model_serializer = IncomeModelSerializer(incomes, many=True)
            user_message = 'Success getting incomes'
            print(user_message)
            return Response(income_model_serializer.data, status=status.HTTP_201_CREATED)
        except:
            user_message = 'Error getting incomes'
        return Response(user_message, status=status.HTTP_400_BAD_REQUEST)
    
# Delete a single income
class DeleteIncome(APIView):
    def post(self, request, *args, **kwargs):
        try:
            income_id = request.data
            income = IncomeModel.objects.get(id=income_id)
            income_model_serializer = IncomeModelSerializer(income, many=False)
            income.delete()
            user_message =  'Success deleting income'
            print(user_message)
            return Response(income_model_serializer.data, status=status.HTTP_201_CREATED)
        except:
            user_message = 'Error deleting income'
            print(user_message)
            return Response(user_message, status=status.HTTP_400_BAD_REQUEST)
        
class SaveCategory(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        try:
            category_model_serializer = CategoryModelSerializer(data=request.data)
            if category_model_serializer.is_valid():
                category_model_serializer.save()
                latest_category = CategoryModel.objects.last()
                category_model_serializer = CategoryModelSerializer(latest_category, many=False)
                user_message = 'Success saving category'
                print(user_message)
                return Response(category_model_serializer.data, status=status.HTTP_201_CREATED)
        except:
            user_message = "Error saving category"
            return Response(user_message, status=status.HTTP_400_BAD_REQUEST)

# View categories
class ViewCategories(APIView):
    def get(self, request, *args, **kwargs):
        try:
            categories = CategoryModel.objects.all()
            category_model_serializer = CategoryModelSerializer(categories, many=True)
            user_message = 'Success getting categories'
            print(user_message)
            return Response(category_model_serializer.data, status=status.HTTP_201_CREATED)
        except:
            user_message = 'Error getting expenses'
            return Response(user_message, status=status.HTTP_400_BAD_REQUEST)

        
# Delete a single category
class DeleteCategory(APIView):
    def post(self, request, *args, **kwargs):
        try:
            category_id = request.data
            category = CategoryModel.objects.get(id=category_id)
            category_model_serializer = CategoryModelSerializer(category, many=False)
            category.delete()
            user_message =  'Success deleting category'
            print(user_message)
            return Response(category_model_serializer.data, status=status.HTTP_201_CREATED)
        except:
            user_message = 'Error deleting category'
            print(user_message)
            return Response(user_message, status=status.HTTP_400_BAD_REQUEST)
        
## Visuals ##

# Monthly spending
class getMonthlySpendingVisuals(APIView):
    def get(self, request, *args, **kwargs):
        
        # Define past 30 days
        last_month = datetime.today() - timedelta(days=30)
        
        categories_list = []
        monthly_spending_dict = {

        }
        categories = CategoryModel.objects.all()
        category_model_serializer = CategoryModelSerializer(categories, many=True)
        
        for item in category_model_serializer.data:
            category = item['category']
            categories_list.append(category)
            
        total_amount_spent_on_category = 0
        for category in categories_list:
            individual_amount_for_category = ExpenseModel.objects.filter(category=category, date__gte=last_month)
            expense_model_serializer = ExpenseModelSerializer(individual_amount_for_category, many=True)
        total_amount_spent_on_category = 0
        for amount in expense_model_serializer.data:
            total_amount_spent_on_category =+ int(amount['amount'])
                 
            monthly_spending_dict.update({category: total_amount_spent_on_category})
            return Response(monthly_spending_dict, status=status.HTTP_200_OK)
            
# Weekly spending
class getWeeklySpendingVisuals(APIView):
    def get(self, request, *args, **kwargs):
        
        # Define past 30 days
        last_week = datetime.today() - timedelta(days=7)
        categories_list = []
        weekly_spending_dict = {

        }
        categories = CategoryModel.objects.all()
        category_model_serializer = CategoryModelSerializer(categories, many=True)
        total_amount_spent_on_category = 0
        for item in category_model_serializer.data:
            category = item['category']
            categories_list.append(category)
        total_amount_spent_on_category = 0
        for category in categories_list:
            individual_amount_for_category = ExpenseModel.objects.filter(category=category, date__gte=last_week)
            expense_model_serializer = ExpenseModelSerializer(individual_amount_for_category, many=True)
            total_amount_spent_on_category = 0
            for amount in expense_model_serializer.data:
                total_amount_spent_on_category =+ int(amount['amount'])
            weekly_spending_dict.update({category: total_amount_spent_on_category})
        
        return Response(weekly_spending_dict, status=status.HTTP_200_OK)

#Spending by category
class getSpendingByCategoryVisuals(APIView):
    def get(self, request, *args, **kwargs):
        categories_list = []
        spending_by_category_dict = {
        }
        categories = CategoryModel.objects.all()
        category_model_serializer = CategoryModelSerializer(categories, many=True)
        
        for item in category_model_serializer.data:
            category = item['category']
            categories_list.append(category)
        total_amount_spent_on_category = 0
        for category in categories_list:
            individual_amount_for_category = ExpenseModel.objects.filter(category=category)
            expense_model_serializer = ExpenseModelSerializer(individual_amount_for_category, many=True)
            total_amount_spent_on_category = 0
            for amount in expense_model_serializer.data:
                total_amount_spent_on_category = total_amount_spent_on_category + int(amount['amount'])
                spending_by_category_dict.update({category: total_amount_spent_on_category})
                return Response(spending_by_category_dict, status=status.HTTP_200_OK)