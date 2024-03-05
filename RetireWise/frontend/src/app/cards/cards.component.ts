import { Component, OnInit } from '@angular/core';
import { TermCard, DefinitionCard } from './types';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TermService } from '../term.service';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  // Dummy data for terms and definitions
  // termCards: TermCard[] = [
  //   {
  //     id: 1,
  //     wordName: 'test',
  //     isFlipped: false,
  //     state: 'default',
  //   },

  //   {
  //     id: 2,
  //     wordName: 'test2',
  //     isFlipped: false,
  //     state: 'default',
  //   },

  //   {
  //     id: 3,
  //     wordName: 'test3',
  //     isFlipped: false,
  //     state: 'default',
  //   },

  //   {
  //     id: 4,
  //     wordName: 'test4',
  //     isFlipped: false,
  //     state: 'default',
  //   },

  //   {
  //     id: 5,
  //     wordName: 'test5',
  //     isFlipped: false,
  //     state: 'default',
  //   },

  //   {
  //     id: 6,
  //     wordName: 'test6',
  //     isFlipped: false,
  //     state: 'default',
  //   },

  //   {
  //     id: 7,
  //     wordName: 'test7',
  //     isFlipped: false,
  //     state: 'default',
  //   },

  //   {
  //     id: 8,
  //     wordName: 'test8',
  //     isFlipped: false,
  //     state: 'default',
  //   },
  // ];

  // definitionCards: DefinitionCard[] = [
  //   {
  //     id: 1,
  //     definition: 'Definition of test',
  //     isFlipped: false,
  //     state: 'default',
  //   },
  //   {
  //     id: 2,
  //     definition: 'Definition of test2',
  //     isFlipped: false,
  //     state: 'default',
  //   },
  //   {
  //     id: 3,
  //     definition: 'Definition of test3',
  //     isFlipped: false,
  //     state: 'default',
  //   },
  //   {
  //     id: 4,
  //     definition: 'Definition of test4',
  //     isFlipped: false,
  //     state: 'default',
  //   },
  //   {
  //     id: 5,
  //     definition: 'Definition of test5',
  //     isFlipped: false,
  //     state: 'default',
  //   },
  //   {
  //     id: 6,
  //     definition: 'Definition of test6',
  //     isFlipped: false,
  //     state: 'default',
  //   },
  //   {
  //     id: 7,
  //     definition: 'Definition of test7',
  //     isFlipped: false,
  //     state: 'default',
  //   },
  //   {
  //     id: 8,
  //     definition: 'Definition of test8',
  //     isFlipped: false,
  //     state: 'default',
  //   },
  // ];

  /*******************************************************************************/
  terms: TermCard[] = [];

  private subscription: Subscription = new Subscription();
  constructor(private termService: TermService) { }

  ngOnInit(): void {
    this.subscription = this.termService.getTerms().subscribe(
      (data) => {
        console.log(data)
        this.terms = data;
      },
      (error) => {
        console.error('Error fetching user data: ', error);
      }
    );
  }

  flip: string = 'inactive';

  /* Checks to make sure only one term and one definition are allowed to be turned over
     at the same time.*/
  // cardTurnOverCheck(array: TermCard[] | DefinitionCard[]): boolean | undefined {
  //   let count: number = 0;
  //   array.forEach(function (obj) {
  //     if (obj.isFlipped && obj.state === 'default') {
  //       count += 1;
  //     }
  //   });

  //   if (count >= 1) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // resetCards(termCardArray: TermCard[], definitionCardArray: DefinitionCard[]) {
  //   let count: number = 0;
  //   let termCardId: number = 1;
  //   let definitionCardId: number = 0;

  //   // Find all cards that are flipped in both the term array and definition array
  //   definitionCardArray.forEach(function (definition) {
  //     console.log(definition.definition);
  //     if (definition.isFlipped === true && definition.state === 'default') {
  //       definitionCardId = definition.id;
  //       count += 1;
  //     }
  //   });
  //   termCardArray.forEach(function (term) {
  //     if (term.isFlipped === true && term.state === 'default') {
  //       termCardId = term.id;
  //       count += 1;
  //     }
  //   });

  //   /* if two or more cards total are flipped over and they are not a match, flip them back
  //      over. If they are a match they will stay flipped to show the name of the term and
  //      the definition
  //   */
  //   if (count >= 2) {
  //     if (termCardId === definitionCardId) {
  //       definitionCardArray.forEach(function (definition) {
  //         if (definition.id === definitionCardId) {
  //           definition.state = 'matched';
  //         }
  //       });
  //       termCardArray.forEach(function (term) {
  //         if (term.id === termCardId) {
  //           term.state = 'matched';
  //         }
  //       });
  //     } else {
  //       definitionCardArray.forEach(function (definition) {
  //         if (definition.state === 'default') {
  //           definition.isFlipped = false;
  //         }
  //       });
  //       termCardArray.forEach(function (term) {
  //         if (term.state === 'default') {
  //           term.isFlipped = false;
  //         }
  //       });
  //     }
  //   }
  // }

  // // handles click event of definition cards
  // definitionCardClicked(id: number): number | undefined {
  //   if (this.cardTurnOverCheck(this.definitionCards) === true) {
  //     return 0;
  //   }
  //   this.definitionCards.forEach(function (definition) {
  //     if (definition.id === id) {
  //       if (definition.isFlipped === false) {
  //         definition.isFlipped = true;
  //         console.log(definition.definition);
  //       } else if (definition.state === 'matched') {
  //         definition.isFlipped = true;
  //       } else {
  //         definition.isFlipped = false;
  //       }
  //     }
  //   });

  //   const myTimeout = setTimeout(
  //     this.resetCards,
  //     2000,
  //     this.termCards,
  //     this.definitionCards
  //   );
  //   return 0;
  // }

  // // handles click event of term cards
  // termCardClicked(id: number): number | undefined {
  //   if (this.cardTurnOverCheck(this.termCards) === true) {
  //     return 0;
  //   }
  //   this.termCards.forEach(function (term) {
  //     if (term.id === id) {
  //       if (term.isFlipped === false) {
  //         term.isFlipped = true;
  //         console.log(term.state + ' ' + term.wordName);
  //       } else if (term.state === 'matched') {
  //         term.isFlipped = true;
  //       } else {
  //         term.isFlipped = false;
  //       }
  //     }
  //   });
  //   const myTimeout = setTimeout(
  //     this.resetCards,
  //     2000,
  //     this.termCards,
  //     this.definitionCards
  //   );
  //   return 0;
  // }
}
