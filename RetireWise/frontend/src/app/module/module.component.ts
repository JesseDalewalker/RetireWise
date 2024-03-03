import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, } from '@angular/router';
import { VideoAndQuizzesComponent } from '../video-and-quizzes/video-and-quizzes.component';
import { CardsComponent } from "../cards/cards.component";

@Component({
    selector: 'app-module',
    standalone: true,
    templateUrl: './module.component.html',
    styleUrl: './module.component.css',
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, VideoAndQuizzesComponent, CardsComponent]
})

export class ModuleComponent{
  //TODO: 1,2,3 is static. Need to add a function that loads the current number of modules from the backend and then generate 
  //initialize moduleIDs with that number. E.g. if there are 3, load number, populate array with 1,2,3. If there are 10, load number,
  //populate array with 1,2,3,4,5,6,7,8,9,10
  moduleIDs: number[] = [1, 2, 3];
  selectedModule: number;
  currentURL: string;

  constructor(private router: Router) {
    this.selectedModule = 0;
    this.currentURL = this.router.url;
  }

  //Reroutes user to the first video and quiz page for any module
  navigateToModule(moduleId: number) {
    this.selectedModule = moduleId;
    this.router.navigate(['/module', this.selectedModule, 'videoandquizzes', 1])
    this.currentURL = this.router.url + '/' + this.selectedModule + '/videoandquizzes/' + 1;
  }

  //Determines if value is numeric or not
  isNumeric(value: any): boolean {
    return !isNaN(value);
  }
}
