from django.urls import path, include
from .views import*
urlpatterns = [
    path('expenses/save/single', SaveExpense.as_view()),
    path('expenses/get/single', GetExpense.as_view()),
    path('expenses/view/all', ViewExpenses.as_view()),
    path('expenses/delete/single', DeleteExpense.as_view()),

    path('income/save/single', SaveIncome.as_view()),
    path('income/get/single', GetIncome.as_view()),
    path('income/view/all', ViewIncomes.as_view()),
    path('income/delete/single', DeleteIncome.as_view()),
    # Categories path
    path('categories/save/single', SaveCategory.as_view()),
    path('categories/view/all', ViewCategories.as_view()),
    path('categories/delete/single', DeleteCategory.as_view()),
    # Visuals path
    path('visuals/get_monthly_Spending_visuals/all', getMonthlySpendingVisuals.as_view()),
    path('visuals/get_weekly_Spending_visuals/all', getMonthlySpendingVisuals.as_view()),
    path('visuals/get_spending_by_category_visuals/all', getSpendingByCategoryVisuals.as_view()),
]