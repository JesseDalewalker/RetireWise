import { Component } from '@angular/core';
import { Expense } from './calc_types';
import { CommonModule } from '@angular/common';
import { Subscription, catchError, throwError } from 'rxjs';
import { ExpenseService } from '../expense.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  expenseForm: FormGroup = new FormGroup({});
  expenses: Expense[] = [];

  submitSubscription: Subscription = new Subscription();
  private subscription: Subscription = new Subscription();
  constructor(private expenseService: ExpenseService, private newForm: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.subscription = this.expenseService.getExpenses().subscribe(
      (data) => {
        console.log(data)
        this.expenses = data;
      },
      (error) => {
        console.error('Error fetching user data: ', error);
      }
    );

    this.expenseForm = this.newForm.group({
      expense: new FormControl(''),
      category: new FormControl(''),
      date: new FormControl(Date),
      amount: new FormControl(Number),
    });
  }

  submit() {
    let expense = {
      expense: this.expenseForm.controls['expense'].value,
      category: this.expenseForm.controls['category'].value,
      date: this.expenseForm.controls['date'].value,
      amount: this.expenseForm.controls['amount'].value,
    };

    console.log(expense.date);

    const options = { headers: { 'Content-Type': 'application/json' } };
    this.submitSubscription = this.http.post('http://localhost:5200/expense/', JSON.stringify(expense), options).subscribe((res: any) => {
      if (res.status === 201) {
        alert("Successful expense creation.");
        // Redirect user to login page
        console.log(res.status)
      }
      catchError((error) => {
        if (error.status === 404) {
          alert('Resource not found.');
        } else if (error.status === 409) {
          alert('Username already exists. Please try another one.');
        } else if (error.status === 500) {
          alert('Server down.');
        } else if (error.status === 502) {
          alert('Bad gateway.');
        } else {
          alert('An error occurred.');
        }
        return throwError(() => error);
      })
    });

    // Prevents double submit to backend
    return false;
  }

  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.submitSubscription) {
      this.submitSubscription.unsubscribe();
    }
  }
  // expenses: Expense[] = [{
  //   id: 1,
  //   expense: "Mortgage Payment",
  //   category: "Mortgage",
  //   date: "3/8/2024",
  //   amount: 2163.00

  // },
  // {
  //   id: 2,
  //   expense: "Electric",
  //   category: "Utilities",
  //   date: "3/2/2024",
  //   amount: 134.54
  // },
  // {
  //   id: 3,
  //   expense: "Gas",
  //   category: "Transportation",
  //   date: "3/8/2024",
  //   amount: 46.32

  // },
  // ]

}

