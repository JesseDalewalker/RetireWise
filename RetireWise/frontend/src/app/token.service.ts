import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, throwError } from 'rxjs';
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

  getToken(): Observable<boolean> {
    return this.validateToken().pipe(
      map(valid => valid),
      catchError(() => of(false))
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

    return this.http.post<{ status: boolean }>(`${this.url}/users/validate`, { token }, options).pipe(
      map(response => response.status),
      catchError(() => {
        return throwError(() => 'Error validating token');
      })
    );
  }
}
