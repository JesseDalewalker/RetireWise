import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualsComponent } from './visuals/visuals.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes:Routes=[
  {
    path:'',
    component:VisualsComponent,
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    VisualsComponent,
  ],
  exports:[VisualsComponent]
})

export class VisualsModule {}
