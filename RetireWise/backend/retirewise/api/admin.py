from django.contrib import admin
from .models import ExpenseModel
from .models import CategoryModel
from .models import IncomeModel

admin.site.register(ExpenseModel)
admin.site.register(CategoryModel)
admin.site.register(IncomeModel)

# Register your models here.
