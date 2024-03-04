import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { ModuleService } from '../module.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HttpClientModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent {
  users: any[] = [];
  modules: any[] = [];
  private subscription: Subscription = new Subscription();
  private newsubscription: Subscription = new Subscription();

  constructor(private userService: UserService, private moduleService: ModuleService) { }


  //Instantiates the page once when it first loads
  ngOnInit(): void {
    this.subscription = this.userService.getUsers().subscribe(
      (data) => {
        console.log(data)
        this.users = data;
      },
      (error) => {
        console.error('Error fetching user data: ', error);
      }
    );

    this.newsubscription = this.moduleService.getModules().subscribe(
      (newdata) => {
        this.modules = newdata;
        console.log(this.modules)
      },
      (error) => {
        console.error('Error fetching module data: ', error);
      }
    );
  }

  //Unsubscribes from the backend upon leaving the home component page, which prevents multiple unnecessary backend calls
  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.newsubscription) {
      this.newsubscription.unsubscribe();
    }

  }
  
}
