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
    expense: "Mortgage Payment",
    category: "Mortgage",
    date: "3/8/2024",
    amount: 2163.00

  },
  {
    id: 2,
    expense: "Electric",
    category: "Utilities",
    date: "3/2/2024",
    amount: 134.54
  },
  {
    id: 3,
    expense: "Gas",
    category: "Transportation",
    date: "3/8/2024",
    amount: 46.32

  },
  ]

}

