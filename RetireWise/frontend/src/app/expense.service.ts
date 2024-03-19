import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Expense } from './calculator/calc_types';

@Injectable({
    providedIn: 'root',
})

export class ExpenseService {
    private url = 'http://localhost:5200';
    private expense$: Subject<Expense[]> = new Subject();

    constructor(private httpClient: HttpClient) { }

    //GET crud operation for frontend
    getExpenses(): Subject<Expense[]> {
        this.httpClient.get<Expense[]>(`${this.url}/expense`).subscribe((expense) => {
            this.expense$.next(expense);
        });
        return this.expense$;
    }
}