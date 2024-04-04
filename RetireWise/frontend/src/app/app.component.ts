import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TokenService } from './services/token.service';
import { first } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  loggedIn: boolean;

  constructor(private tokenService: TokenService) {
    this.loggedIn = false;
  }

  ngOnInit() {
    this.tokenService.getToken().pipe(first()).subscribe((tokenCheck: boolean) => {
      this.loggedIn = tokenCheck
    });
  }

  logout() {
    this.tokenService.removeToken();
    window.location.href = '/home';
  }
}
