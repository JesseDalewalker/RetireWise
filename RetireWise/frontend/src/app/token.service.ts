import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  private url = 'http://localhost:5200';

  constructor(private cookieService: CookieService, private http: HttpClient) {}

  setToken(token: string): void {
    this.cookieService.set('jwtToken', token);
  }

  getToken(): Observable<string | null> {
    return this.validateToken().pipe(
      map(valid => {
        if (valid) {
          return this.cookieService.get('jwtToken');
        } else {
          return null;
        }
      }),
      catchError(() => {
        return new Observable<string | null>(observer => {
          observer.next(null);
          observer.complete();
        });
      })
    );
  }

  removeToken(): void {
    this.cookieService.delete('jwtToken');
  }

  private validateToken(): Observable<boolean> {
    const token = this.cookieService.get('jwtToken');
    
    if (!token) {
      return throwError(() => 'Token not found');
    }

    const options = { headers: { 'Content-Type': 'application/json' } };

    return this.http.post<boolean>(`${this.url}/users/validate`, { token }, options).pipe(
      catchError(() => {
        return throwError(() => 'Error validating token');
      })
    );
  }
}
