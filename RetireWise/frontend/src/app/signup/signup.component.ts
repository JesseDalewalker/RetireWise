import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user.service';
import { Observable } from 'rxjs';
import { User } from '../../user';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app.routes';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form: FormGroup = new FormGroup({});

  constructor(private newForm: FormBuilder) {}

  //Initializes a new form with input validation for each variable
  ngOnInit() {
    this.form = this.newForm.group({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]*'),
      ]),
      password: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required]),
    });
  }

  //submit() function will create a new user and submit user to backend for approval
  submit() {}

  //reset() function will reset (or erase) all current form information
  reset() {
    this.form.reset();
  }
}
