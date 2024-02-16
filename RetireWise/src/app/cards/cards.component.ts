import { Component } from '@angular/core';
import { WordCard } from './types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  wordCards: WordCard[] = [
    {
      id: 1,
      wordName: 'test',
    },

    {
      id: 2,
      wordName: 'test2',
    },
  ];
}
