import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Module } from '../../../backend/src/module';

@Injectable({
  providedIn: 'root',
})

export class ModuleService {
  private url = 'http://localhost:5200';
  private modules$: Subject<Module[]> = new Subject();

  constructor(private httpClient: HttpClient) {}

  private refreshModules() {
    this.httpClient.get<Module[]>(`${this.url}/modules`).subscribe((modules) => {
      this.modules$.next(modules);
    });
  }

  getModules(): Subject<Module[]> {
    this.refreshModules();
    return this.modules$;
  }
}
