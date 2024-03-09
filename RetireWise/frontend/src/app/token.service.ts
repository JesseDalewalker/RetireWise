import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private cookieService: CookieService) {}

  setToken(token: string): void {
    this.cookieService.set('jwtToken', token);
  }

  getToken(): string | null {
    return this.cookieService.get('jwtToken');
  }

  removeToken(): void {
    this.cookieService.delete('jwtToken');
  }

  //TODO - Add validateToken() where it sends a POST request to backend to check if JWT user has is valid
}
