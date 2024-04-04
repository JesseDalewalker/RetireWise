import { Component } from '@angular/core';
import { Expense } from './calc_types';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ExpenseService } from '../../services/expense.service'


@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {

  expenses: Expense[] = [];


  private subscription: Subscription = new Subscription();
  private newsubscription: Subscription = new Subscription();
  constructor(private expenseService: ExpenseService) { }

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
  }
  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
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

