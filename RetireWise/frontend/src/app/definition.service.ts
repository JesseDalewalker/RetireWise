import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DefinitionCard } from './cards/types';

@Injectable({
    providedIn: 'root',
})

export class DefinitionService {
    private url = 'http://localhost:5200';
    private definitions$: Subject<DefinitionCard[]> = new Subject();

    constructor(private httpClient: HttpClient) { }

    private refreshDefinitions() {
        this.httpClient.get<DefinitionCard[]>(`${this.url}/definitions`).subscribe((definitions) => {
            this.definitions$.next(definitions);
        });
    }

    getDefinitions(): Subject<DefinitionCard[]> {
        this.refreshDefinitions();
        return this.definitions$;
    }
}