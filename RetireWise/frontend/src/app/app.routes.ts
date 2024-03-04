import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ModuleComponent } from './module/module.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { UsersListComponent } from './users-list/users-list.component';

//Application Routing
//Path should match the routerLink indicated in app.component.html
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'module', component: ModuleComponent },
  { path: 'module/:id', component: ModuleComponent },
  {
    path: 'module/:id/videoandquizzes/:videoandquizzesId',
    component: ModuleComponent,
  },
  { path: 'module/:id/cards', component: ModuleComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'users', component: UsersListComponent },
];

export const appRoutingModule = RouterModule.forRoot(routes);
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
