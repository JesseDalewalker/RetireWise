import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { SignupComponent } from '../app/components/signup/signup.component';
import { HomeComponent } from '../app/components/home/home.component';
import { ModuleComponent } from '../app/components/module/module.component';
import { CalculatorComponent } from '../app/components/calculator/calculator.component';

//Application Routing
//Path should match the routerLink indicated in app.component.html
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'module', component: ModuleComponent },
  { path: 'module/:id', component: ModuleComponent },
  { path: 'module/:id/videoandquizzes/:videoandquizzesId', component: ModuleComponent },
  { path: 'module/:id/cards', component: ModuleComponent },
  { path: 'calculator', redirectTo: '/Budget-Tracker', pathMatch: 'full' },
];

export const appRoutingModule = RouterModule.forRoot(routes);
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
