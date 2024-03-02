import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  form: FormGroup = new FormGroup({});

  constructor(private newForm: FormBuilder, private router: Router){}

  //Initializes a new form with input validation for each variable
  ngOnInit() {
    this.form = this.newForm.group({
      username: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]),
      password: new FormControl("", [Validators.required])
    })
  }

  //submit() function will create a new user and submit user to backend for approval
  submit() {
    let user = {
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value
    }
  }

  //reset() function will reset (or erase) all current form information
  reset() {
    this.form.reset();
  }

  //Navigates to the signup page
  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }

  //submit() function will create a new user and submit user to backend for approval
  submit() {
    let user = {
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value,
    }
  }
}
