import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-video-and-quizzes',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './video-and-quizzes.component.html',
  styleUrl: './video-and-quizzes.component.css',
})
export class VideoAndQuizzesComponent {}
