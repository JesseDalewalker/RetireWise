import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:5200';
  private users$: Subject<User[]> = new Subject();

  constructor(private httpClient: HttpClient) {}

  private refreshUsers() {
    this.httpClient.get<User[]>(`${this.url}/users`).subscribe((users) => {
      this.users$.next(users);
    });
  }

  getUsers(): Subject<User[]> {
    this.refreshUsers();
    return this.users$;
  }
}
