import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { TermCard } from './cards/types';

@Injectable({
    providedIn: 'root',
})

export class TermService {
    private url = 'http://localhost:5200';
    private terms$: Subject<TermCard[]> = new Subject();

    constructor(private httpClient: HttpClient) { }

    private refreshTerms() {
        this.httpClient.get<TermCard[]>(`${this.url}/terms`).subscribe((terms) => {
            this.terms$.next(terms);
        });
    }

    getTerms(): Subject<TermCard[]> {
        this.refreshTerms();
        return this.terms$;
    }
}
