import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    TopNavigationComponent, 
    FooterComponent, 
    SideNavigationComponent,
  ],
  exports:[CommonModule, TopNavigationComponent, FooterComponent, SideNavigationComponent]
})
export class SharedModule { }
