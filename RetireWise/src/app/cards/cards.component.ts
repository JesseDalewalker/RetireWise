import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { WordCard, DefinitionCard } from './types';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
  animations: [
    trigger('cardFlip', [
      state(
        'default',
        style({
          transform: 'none',
        })
      ),
      state(
        'flipped',
        style({
          transform: 'rotateY(180deg)',
        })
      ),
      state(
        'matched',
        style({
          visibility: 'false',
          transform: 'scale(0.05)',
          opacity: 0,
        })
      ),
      transition('default => flipped', [animate('400ms')]),
      transition('flipped => default', [animate('400ms')]),
      transition('* => matched', [animate('400ms')]),
    ]),
  ],
})
export class CardsComponent implements OnInit {
  wordCards: WordCard[] = [
    {
      id: 1,
      wordName: 'test',
      isFlipped: false,
      state: 'default',
    },

    {
      id: 2,
      wordName: 'test2',
      isFlipped: false,
      state: 'default',
    },
  ];

  definitionCards: DefinitionCard[] = [
    {
      id: 1,
      definition: 'Definition of test',
      isFlipped: false,
      state: 'default',
    },
    {
      id: 2,
      definition: 'Definition of test2',
      isFlipped: false,
      state: 'default',
    },
  ];

  constructor() {}

  ngOnInit() {}

  flip: string = 'inactive';

  cardClicked(id: number) {
    this.wordCards.forEach(function (word) {
      if (word.id === id) {
        if (word.isFlipped === false) {
          word.isFlipped = true;
          word.state = 'flipped';
          console.log(word.state + ' ' + word.wordName);
        } else {
          word.isFlipped = false;
          word.state = 'default';
        }
      }
    });
  }

  definitionCardClicked(id: number) {
    this.definitionCards.forEach(function (definition) {
      if (definition.id === id) {
        if (definition.isFlipped === false) {
          definition.isFlipped = true;
          definition.state = 'flipped';
          console.log(definition.state + ' ' + definition.definition);
        } else {
          definition.isFlipped = false;
          definition.state = 'default';
        }
      }
    });
  }
}
