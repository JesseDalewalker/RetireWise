import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})

export class SignupComponent {
  form: FormGroup = new FormGroup({});
  submitSubscription: Subscription = new Subscription();
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  passwordPattern: string = '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';
  
  constructor(private newForm: FormBuilder, private http:HttpClient, private router:Router) {}

  ngOnInit() {
    this.form = this.newForm.group({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
      password2: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator = (control: AbstractControl) => {
    const password = control.get('password')?.value;
    const password2 = control.get('password2')?.value;
    
    if (password !== null && password2 !== null && password !== password2) {
      return { 'passwordMismatch': true };
    }
  
    return null;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    let user = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
    };
  
    const options = { headers: { 'Content-Type': 'application/json' } };
    this.submitSubscription = this.http.post('http://localhost:5200/users/', JSON.stringify(user), options).subscribe((res: any) => {
      if (res.status === 201) {
        alert("Successful account creation.");
        // Redirect user to login page
        console.log(res.status)
        this.router.navigateByUrl('/login');
      }
      catchError((error) => {
        if (error.status === 404) {
          alert('Resource not found.');
        } else if (error.status === 409) {
          alert('Email already exists. Please try another one.');
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

  ngOnDestroy(): void {
    if (this.submitSubscription) {
      this.submitSubscription.unsubscribe();
    }
  }
}
