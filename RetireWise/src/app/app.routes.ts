import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { VideoAndQuizzesComponent } from './video-and-quizzes/video-and-quizzes.component';
import { LoginComponent } from './login/login.component';
import { CardsComponent } from './cards/cards.component';
import { CalculatorComponent } from './calculator/calculator.component';

//Application Routing
//Path should match the routerLink indicated in app.component.html
export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'home', component: HomeComponent },
    { path: 'videosandquizzes', component: VideoAndQuizzesComponent },
    { path: 'cards', component: CardsComponent },
    { path: 'calculator', component: CalculatorComponent }
];

export const appRoutingModule = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }