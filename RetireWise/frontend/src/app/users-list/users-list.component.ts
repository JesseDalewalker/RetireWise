import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../user';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  users$: Observable<User[]> = new Observable();

  constructor(private userService: UserService) {}

  //Initializes a new form with input validation for each variable
  ngOnInit(): void {
    this.fetchUsers;
  }

  private fetchUsers(): void {
    console.log('fetching users');
    this.users$ = this.userService.getUsers();
    console.log(this.users$);
  }
}
