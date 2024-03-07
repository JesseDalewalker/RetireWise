import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
private baseUrl:string;

  constructor(private http:HttpClient) {
    this.baseUrl = environment.restApi.uri
   }

   getCategories(){
    return this.http.get<any>(
      this.baseUrl + 'app/categories/view/all' 
    )
   }

   saveCategory(data:any){
    return this.http.post<any>(
      this.baseUrl + '/app/categories/save/single',data
    )
   }

   deleteCategory(categoryId:any){
    return this.http.post<any>(
      this.baseUrl + '/app/categories/delete/single',categoryId
    )
   }
}
