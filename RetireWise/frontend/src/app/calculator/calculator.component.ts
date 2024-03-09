import { Component } from '@angular/core';
import { Expense } from './calc_types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  expenses: Expense[] = [{
    id: 1,
    expense: "Kroger",
    category: "Groceries",
    date: "3/8/2024",
    amount: 132.45

  },
  {
    id: 2,
    expense: "McDonalds",
    category: "Dining",
    date: "3/2/2024",
    amount: 7.34
  },
  {
    id: 1,
    expense: "Kroger",
    category: "Groceries",
    date: "3/8/2024",
    amount: 132.45

  },
  {
    id: 2,
    expense: "McDonalds",
    category: "Dining",
    date: "3/2/2024",
    amount: 7.34
  },
  {
    id: 1,
    expense: "Kroger",
    category: "Groceries",
    date: "3/8/2024",
    amount: 132.45

  },
  {
    id: 2,
    expense: "McDonalds",
    category: "Dining",
    date: "3/2/2024",
    amount: 7.34
  },
  ]

}

