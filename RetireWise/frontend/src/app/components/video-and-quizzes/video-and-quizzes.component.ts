import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VideoService } from '../../services/video.service';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-video-and-quizzes',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './video-and-quizzes.component.html',
  styleUrl: './video-and-quizzes.component.css',
})

export class VideoAndQuizzesComponent {

  videos: any[] = [];
  quizzes: any[] = [];

  private videoSubscription: Subscription = new Subscription();
  private quizSubscription: Subscription = new Subscription();

  numOfVidQuizPages: any[] = [];
  totalVideoAndQuizPageMatches: number;

  currentModuleId!: number;
  currentVideoAndQuizPageID!: number;
  currentVideoID: string;

  videoURL!: SafeResourceUrl;

  options: [number, string[]][] = [];
  selectedOptions: (string | null)[] = [];

  constructor(private sanitizer: DomSanitizer, private router: Router, private videoService: VideoService, private quizService: QuizService) {

    const url = this.router.url;

    const match = url.match(/\/module\/(\d+)/);
    if (match) {
      this.currentModuleId = +match[1];
    }

    const videoMatch = url.match(/\/videoandquizzes\/(\d+)/);
    if (videoMatch) {
      this.currentVideoAndQuizPageID = +videoMatch[1];
    }

    this.totalVideoAndQuizPageMatches = 0;

    this.currentVideoID = '';
  }

  // Method to handle option selection
  onSelectOption(option: string, quizIndex: number) {
    this.selectedOptions[quizIndex] = option;
  }

  //Function that redirects user to a module/:id/cards page, where :id is the current module number
  navigateToCards() {
    this.router.navigate(['/module', this.currentModuleId, 'cards']);
  }

  getModuleId(): string {
    return this.videos.at(0).moduleID;
  }

  //Instantiates the page once when it first loads
  ngOnInit(): void {
    this.videoSubscription = this.videoService.getVideos().subscribe(
      (newdata) => {

        this.videos = newdata;

        this.videos.forEach(video => {
          if (video.moduleID === this.currentModuleId) {
            this.totalVideoAndQuizPageMatches++;
            if (video.videoAndQuizPageID === this.currentVideoAndQuizPageID) {
              this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.videoID}`);
            }
          }
        });

        this.numOfVidQuizPages = Array.from({length: this.totalVideoAndQuizPageMatches}, (_, i) => i + 1)

        },
        (error) => {
          console.error('Error fetching video data: ', error);
        }
    );

    this.quizSubscription = this.quizService.getQuizzes().subscribe(
      (newdata2) => {
        newdata2.forEach(quiz => {
          if (quiz.moduleID === this.currentModuleId) {
            if (quiz.videoAndQuizPageID === this.currentVideoAndQuizPageID) {
              this.quizzes.push(quiz);
            }
          }
        });
      },
      (error) => {
        console.error('Error fetching quiz data: ', error);
      }
    );
  }

  //Unsubscribes from the backend upon leaving the home component page, which prevents multiple unnecessary backend calls
  ngOnDestroy(): void {
    if (this.videoSubscription) {
      this.videoSubscription.unsubscribe();
    }
    if (this.quizSubscription) {
      this.quizSubscription.unsubscribe();
    }
  }

  reloadComponent(module: number) {
    // Split the current URL into segments
    let currentUrlSegments = this.router.url.split('/');
    const videoAndQuizzesIndex = currentUrlSegments.indexOf('videoandquizzes');
    // Replace the integer value after 'videoandquizzes' with the videoandquizzes page number the user selected
    const newValue = module;
    currentUrlSegments[videoAndQuizzesIndex + 1] = String(newValue);
    // Reconstruct the URL with the modified segment
    const newUrl = currentUrlSegments.join('/');
    // Navigate to the new URL
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(newUrl);
    });
  }
}
