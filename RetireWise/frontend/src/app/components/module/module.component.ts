import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, } from '@angular/router';
import { VideoAndQuizzesComponent } from '../video-and-quizzes/video-and-quizzes.component';
import { CardsComponent } from "../cards/cards.component";
import { Subscription } from 'rxjs';
import { ModuleService } from '../../services/module.service';

@Component({
    selector: 'app-module',
    standalone: true,
    templateUrl: './module.component.html',
    styleUrl: './module.component.css',
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, VideoAndQuizzesComponent, CardsComponent]
})

export class ModuleComponent{
  modules: any[] = [];
  selectedModule: number;
  currentURL: string;
  private newsubscription: Subscription = new Subscription();

  constructor(private router: Router, private moduleService: ModuleService) {
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

  //Instantiates the page once when it first loads
  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      // Check if the modules array is empty or the current URL is '/module'
      // If either condition is true, fetch the module data
      this.newsubscription = this.moduleService.getModules().subscribe(
        (newdata) => {
          this.modules = newdata.sort((a, b) => a.moduleNumber - b.moduleNumber);
        },
        (error) => {
          console.error('Error fetching module data: ', error);
        }
      );
    }
  }
  
  //Unsubscribes from the backend upon leaving the home component page, which prevents multiple unnecessary backend calls
  ngOnDestroy(): void {
    if (this.newsubscription) {
      this.newsubscription.unsubscribe();
    }
  }

}
