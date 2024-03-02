from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


# '''
# class AccountInfo(models.Model):
#     username = models.CharField(max_length=20)
#     password = models.CharField(max_length=20)
#     user_budget = models.IntegerField()
    
#     def __str__(self):
#         return self.username
# '''

# class ExpenseInfo(models.Model):
#     expense_name = models.CharField(max_length=20)
#     cost = models.FloatField()
#     date_added = models.DateField()
#     user_expense = models.ForeignKey(User, on_delete=models.CASCADE)

# class IncomeInfo(models.Model):
#     income_name = models.CharField(amx_length=20)
#     amount = models.FloatField()
#     date_added = models.DateField()
#     user_income = models.ForeignKey(User, on_delete=models.CASCADE)

