from django.shortcuts import render
from django.contrib.auth import logout,login,authenticate
from django.http import HttpResponseRedirect,HttpResponse


# def logout_view(request):
#     logout(request)
#     return HttpResponseRedirect('/')


# def sign_up(request):
#     if request.method == 'POST':
#         form = UserCreationForm(request.POST)
#         if form.is_valid():
#             user=form.save()
#             login(request,user)
#             return HttpResponseRedirect('app')
#         else:
#             for msg in form.error_messages:
#                 print(form.error_messages[msg])
#     else:
#         form = UserCreationForm
#         return render(request,'budget_app/sign_up.html',{'form':form})