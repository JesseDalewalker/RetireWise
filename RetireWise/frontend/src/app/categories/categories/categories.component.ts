import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { from } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { CategoriesService } from '../categories.service';
import { HttpErrorResponse } from '@angular/common/http'


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  categoryForm: FormGroup;
  categoryModel: CategoryModel;
  categories:any;

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
  ) {
    this.categoryModel = new CategoryModel();
  }

  ngOnInit(){
    this.intializeCategoryForm();
    this.getCategories();
  }

  intializeCategoryForm():void{
    this.categoryForm = this.formBuilder.group({
      id:this.categoryModel.id,
      category:this.categoryModel.category,
    });
  }

  getCategories(){
    this.categoriesService.getCategories().subscribe(
      (res) =>{
        this.categories = res;
        //console.log(this.expenses);
        console.log('Success getting categories');
      },
      (err:HttpErrorResponse)=>{
        console.log(err.error);
      }
    )
  }

  deleteCategory(index, categoryId){
    this.categoriesService.deleteCategory(categoryId).subscribe(
      (res)=>{
        this.categories.splice(index,1)
      },
      (err:HttpErrorResponse)=>{
        console.log(err.error);
      }
    )
  }

  categoryFormSubmit(){
    const data = this.categoryForm.getRawValue();
    if(this.categoryForm.valid){
      this.categoriesService.saveCategory(data).subscribe(
        (res)=>{
          console.log(res);
          this.getCategories();
        },
        (err:HttpErrorResponse)=>{
          console.log(err.error);
        }
      )
    }
  }
}
