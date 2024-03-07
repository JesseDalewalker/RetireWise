import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { from } from 'rxjs';
import { ExpenseModel } from '../../models/expense.model'
import { ExpensesService } from '../expenses.service'
import { CategoriesService } from "../../categories/categories.service";
import { HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})

export class ExpensesComponent implements OnInit {


  expenseForm: FormGroup;
  expenseModel: ExpenseModel;
  expenses: any;
  categories: any;
  expense: any;

  constructor(
    private expensesService: ExpensesService,
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
  ){
    this.expenseModel = new ExpenseModel();
  }

  ngOnInit() {
    this.initializeExpenseForm();
    this.getExpenses();
    this.getCategories();
  }

  initializeExpenseForm(): void {
    this.expenseForm = this.formBuilder.group({
      id:this.expenseModel.id,
      expense:this.expenseModel.expense,
      category:this.expenseModel.category,
      date:this.expenseModel.date,
      amount:this.expenseModel.amount,
    });
  }


  getExpenses() {
    this.expensesService.getExpenses().subscribe(
      (res) => {
        this.expenses = res;
        //console.log(this.expenses);
        console.log('Success getting expenses');
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    )
  }

  //get all categories
  getCategories(){
    this.categoriesService.getCategories().subscribe(
      (res) => {
        this.categories = res;
        // console.log(this.expenses);
        console.log('Success getting categories');
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    )
  }


  getExpense(expenseId){
    this.expensesService.getExpense(expenseId).subscribe(
      (res)=>{
        console.log(res)
        this.expense = res;
        this.expenseForm.patchValue({
          id:this.expense.id,
          expense:this.expense.expense,
          category:this.expense.category,
          date:this.expense.date,
          amount:this.expense.amount,
        })


      },
      (err:HttpErrorResponse) =>{
        console.log(err.error);
      }
    )
  }

  deleteExpense(index,expenseId){
    const confirm = window.confirm('Are You sure?');
    if(confirm){
      this.expensesService.deleteExpense(expenseId).subscribe(
        (res)=>{
          this.expenses.splice(index,1)
        },
        (err:HttpErrorResponse)=> {
          console.log(err.error);
        }
      )
    }
  }


  expenseFormSubmit(){
    const data=this.expenseForm.getRawValue();
    if(this.expenseForm.valid){
      console.log(data);
      this.expensesService.saveExpense(data).subscribe(
        (res)=>{
          console.log(res);
          this.getExpenses();
        },
        (err:HttpErrorResponse)=>{
          console.log(err.error);
        }
      )
      }
    }

}
