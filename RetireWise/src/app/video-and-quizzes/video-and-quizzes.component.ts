import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-video-and-quizzes',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './video-and-quizzes.component.html',
  styleUrl: './video-and-quizzes.component.css',
})

export class VideoAndQuizzesComponent {

  //TODO: Need to add function that loads videoID, questions, and options data from backend into their appropriate variables

  //videoID is the everything after watch?v= in a YouTube video 
  //(Ex. https://www.youtube.com/watch?v=vStru2voDjY, vStru2voDjY is the ID)
  videoID = 'V241x0heWzQ';
  videoURL: SafeResourceUrl;

  questions: string[];
  options: [number, string[]][] = [];
  selectedOptions: (string | null)[] = [];
  
  currentModuleId!: number;
  modules = [1, 2];

  constructor(private sanitizer: DomSanitizer, private router: Router) {
    this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoID}`);

    this.questions = ['Is this a question?', 'Is this also a question?'];
    this.options = [[1, ['Option 1', 'Option 2']], [2, ['Option A', 'Option B', 'Option C']]];
    this.selectedOptions = new Array(this.questions.length).fill(null);

    const url = this.router.url;
    const match = url.match(/\/module\/(\d+)/); 
    if (match) {
      this.currentModuleId = +match[1];
    }
  }

  //Function that handles the selection of an option
  onSelectOption(option: string, questionIndex: number) {
    // Set the selected option for the clicked question
    this.selectedOptions[questionIndex] = option;
  }

  //Function that redirects user to a module/:id/cards page, where :id is the current module number
  navigateToCards() {
    this.router.navigate(['/module', this.currentModuleId, 'cards']);
  }
}
