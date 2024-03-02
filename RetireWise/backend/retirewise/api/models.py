from django.db import models

# Create your models here.
class ExpenseModel(models.Model):
    expense = models.CharField(max_length=100)
    category = models.CharField(max_length=256)
    date = models.DateField(default=0)
    amount = models.IntegerField(default=0)
    def __str__(self):
        return self.expense

class CategoryModel(models.Model):
    category = models.CharField(max_length=100)
    def __str__(self):
        return self.category
    
class IncomeModel(models.Model):
    income = models.CharField(max_length=100)
    category = models.CharField(max_length=256)
    date = models.DateField(default=0)
    amount = models.IntegerField(default=0)
    def __str__(self):
        return self.income
