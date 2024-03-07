import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})

export class SignupComponent {
  form: FormGroup = new FormGroup({});

  constructor(private newForm: FormBuilder, private http:HttpClient, private router:Router) {}

  //Initializes a new form with input validation for each variable
  ngOnInit() {
    this.form = this.newForm.group({
      email: new FormControl('', [Validators.required, Validators.email,]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')]),
      password2: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')]),
    });
  }

  submit() {
    let user = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
    };
  
    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:5200/users/', JSON.stringify(user), options).subscribe((res: any) => {
      if (res.status === 201) {
        alert("Successful account creation.");
        // Redirect user to login page
        this.router.navigateByUrl('/login');
      }
      catchError((error) => {
        if (error.status === 404) {
          alert('Resource not found.');
        } else if (error.status === 409) {
          alert('Username already exists. Please try another one.');
        } else if (error.status === 500) {
          alert('Server down.');
        } else if (error.status === 502) {
          alert('Bad gateway.');
        } else {
          alert('An error occurred.');
        }
        return throwError(() => error);
      })
    });
      
    // Prevents double submit to backend
    return false;
  }
  

  //reset() function will reset (or erase) all current form information
  reset() {
    this.form.reset();
  }
}
