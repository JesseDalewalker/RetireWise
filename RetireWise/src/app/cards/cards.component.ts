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

    {
      id: 3,
      wordName: 'tes3',
      isFlipped: false,
      state: 'default',
    },

    {
      id: 4,
      wordName: 'test4',
      isFlipped: false,
      state: 'default',
    },

    {
      id: 5,
      wordName: 'test5',
      isFlipped: false,
      state: 'default',
    },

    {
      id: 6,
      wordName: 'test6',
      isFlipped: false,
      state: 'default',
    },

    {
      id: 7,
      wordName: 'test7',
      isFlipped: false,
      state: 'default',
    },

    {
      id: 8,
      wordName: 'test8',
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
    {
      id: 3,
      definition: 'Definition of test3',
      isFlipped: false,
      state: 'default',
    },
    {
      id: 4,
      definition: 'Definition of test4',
      isFlipped: false,
      state: 'default',
    },
    {
      id: 5,
      definition: 'Definition of test5',
      isFlipped: false,
      state: 'default',
    },
    {
      id: 6,
      definition: 'Definition of test6',
      isFlipped: false,
      state: 'default',
    },
    {
      id: 7,
      definition: 'Definition of test7',
      isFlipped: false,
      state: 'default',
    },
    {
      id: 8,
      definition: 'Definition of test8',
      isFlipped: false,
      state: 'default',
    },
  ];

  constructor() {}

  ngOnInit() {}

  flip: string = 'inactive';

  // Checks to make sure only one term and one definition are allowed to be turned over
  // at the same time.
  cardTurnOverCheck(array: WordCard[] | DefinitionCard[]): boolean | undefined {
    let count: number = 0;
    array.forEach(function (obj) {
      if (obj.isFlipped && obj.state === 'default') {
        count += 1;
      }
    });

    if (count >= 1) {
      return true;
    } else {
      return false;
    }
  }

  // cardsMatched(
  //   wordCardArray: WordCard[], definitionCardArray: DefinitionCard[]
  // ): boolean | undefined {

  //   let count: number = 0;
  //   let wordCardId: number = 1;
  //   let definitionCardId: number = 0;
  //   definitionCardArray.forEach(function (definition) {
  //     console.log(definition.definition);
  //     if (definition.isFlipped === true && definition.state === 'default') {
  //       definitionCardId = definition.id;
  //       count += 1;
  //     }
  //   });
  // }

  resetCards(wordCardArray: WordCard[], definitionCardArray: DefinitionCard[]) {
    console.log('here');
    let count: number = 0;
    let wordCardId: number = 1;
    let definitionCardId: number = 0;

    // Find all cards that are flipped in both the term array and definition array
    definitionCardArray.forEach(function (definition) {
      console.log(definition.definition);
      if (definition.isFlipped === true && definition.state === 'default') {
        definitionCardId = definition.id;
        count += 1;
      }
    });
    wordCardArray.forEach(function (term) {
      if (term.isFlipped === true && term.state === 'default') {
        wordCardId = term.id;
        count += 1;
      }
    });

    // if two or more cards total are flipped over, reset all cards
    if (count >= 2) {
      if (wordCardId === definitionCardId) {
        definitionCardArray.forEach(function (definition) {
          if (definition.id === definitionCardId) {
            definition.state = 'matched';
          }
        });
        wordCardArray.forEach(function (term) {
          if (term.id === wordCardId) {
            term.state = 'matched';
          }
        });
      } else {
        definitionCardArray.forEach(function (definition) {
          if (definition.state === 'default') {
            definition.isFlipped = false;
          }
        });
        wordCardArray.forEach(function (term) {
          if (term.state === 'default') {
            term.isFlipped = false;
          }
        });
      }
    }
  }

  definitionCardClicked(id: number): number | undefined {
    if (this.cardTurnOverCheck(this.definitionCards) === true) {
      return 0;
    }
    this.definitionCards.forEach(function (definition) {
      if (definition.id === id) {
        if (definition.isFlipped === false) {
          definition.isFlipped = true;
          console.log(definition.definition);
        } else if (definition.state === 'matched') {
          definition.isFlipped = true;
        } else {
          definition.isFlipped = false;
        }
      }
    });

    const myTimeout = setTimeout(
      this.resetCards,
      2000,
      this.wordCards,
      this.definitionCards
    );
    // this.resetCards();
    return 0;
  }

  cardClicked(id: number): number | undefined {
    if (this.cardTurnOverCheck(this.wordCards) === true) {
      return 0;
    }
    this.wordCards.forEach(function (word) {
      if (word.id === id) {
        if (word.isFlipped === false) {
          word.isFlipped = true;
          console.log(word.state + ' ' + word.wordName);
        } else if (word.state === 'matched') {
          word.isFlipped = true;
        } else {
          word.isFlipped = false;
        }
      }
    });
    const myTimeout = setTimeout(
      this.resetCards,
      2000,
      this.wordCards,
      this.definitionCards
    );
    return 0;
  }
}
