import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesComponent } from './expenses/expenses.component';
import { Routes, RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  {
    path:'expenses',
    component:ExpensesComponent,
  }
]


@NgModule({
  declarations: [ExpensesComponent],
  imports: [
    RouterModule.forChild(appRoutes),
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    ExpensesComponent,
  ]
})
export class ExpensesModule { }
