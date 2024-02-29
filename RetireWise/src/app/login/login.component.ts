import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  form: FormGroup = new FormGroup({});

  constructor(private newForm: FormBuilder){}

  //Initializes a new form with input validation for each variable
  ngOnInit() {
    this.form = this.newForm.group({
      username: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]),
      password: new FormControl("", [Validators.required]),
      password2: new FormControl("", [Validators.required]),
    })
  }

  //submit() function will create a new user and submit user to backend for approval
  submit() {
    let user = {
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value,
    }
  }
}
