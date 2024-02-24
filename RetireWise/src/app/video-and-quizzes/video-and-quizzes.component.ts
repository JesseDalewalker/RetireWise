import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-video-and-quizzes',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './video-and-quizzes.component.html',
  styleUrl: './video-and-quizzes.component.css',
})

export class VideoAndQuizzesComponent {

  //TODO: Need to add function that loads videoID, questions, and answers data from backend into their appropriate variables

  //videoID is the everything after watch?v= in a YouTube video 
  //(Ex. https://www.youtube.com/watch?v=vStru2voDjY, vStru2voDjY is the ID)
  videoID = 'V241x0heWzQ';
  videoURL: SafeResourceUrl;

  //TODO: Need to change question to a string[] whenever we dynamically load questions from backend
  @Input() question: string;
  @Input() options: string[];
  @Output() optionSelected = new EventEmitter<string>();

  selectedOption!: string;

  constructor(private sanitizer: DomSanitizer) {
    this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoID}`);
    this.question = 'Is this a question?';
    this.options = ['Option 1', 'Option 2'];
  }

  //Function that handles the selection of an option and communicates it to the VideoAndQuizzesComponent component
  onSelectOption(option: string) {
    this.selectedOption = option;
    this.optionSelected.emit(option);
  }

}
