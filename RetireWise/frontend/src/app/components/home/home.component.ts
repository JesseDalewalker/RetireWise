import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { SlickCarouselModule } from "ngx-slick-carousel";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, SlickCarouselModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent {
  slides = [{ content: "Videos" },
  { content: "Quizzes" },
  { content: "Matching Cards" }, { content: "Budget Calculator" }]

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "autoplay": true,
    "autoplaySpeed": 3000,
    "pauseOnHover": true
  }
}
