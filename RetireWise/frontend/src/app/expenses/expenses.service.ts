import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = environment.restApi.uri
   }

   getExpenses() {
    return this.http.get<any>(
      this.baseURL + '/app/expenses/view/all'
    )
   }

   saveExpense(data:any){
    return this.http.post<any>(
      this.baseURL+'/app/expenses/save/single', data
    )
   }

   deleteExpense(expenseId:any){
    return this.http.post<any>(
      this.baseURL+'/app/expenses/delete/single',expenseId
    )
   }

   getExpense(expenseId:any){
    return this.http.post<any>(
      this.baseURL+'/app/expenses/get/single',expenseId
    )
   }

   editExpense(data:any){
    return this.http.post<any>(
      this.baseURL+'/app/expenses/edit/single',data
    )
   }
}
