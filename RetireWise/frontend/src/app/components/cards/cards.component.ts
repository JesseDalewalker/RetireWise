import { Component } from '@angular/core';
import { TermCard, DefinitionCard } from '../cards/types'
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TermService } from '../../services/term.service';
import { DefinitionService } from '../../services/definition.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {

  terms: TermCard[] = [];
  definitions: DefinitionCard[] = [];

  currentModuleId!: number;

  private subscription: Subscription = new Subscription();
  private newsubscription: Subscription = new Subscription();
  constructor(private termService: TermService, private definitionService: DefinitionService, private router: Router) {

    const url = this.router.url;

    const match = url.match(/\/module\/(\d+)/);
    if (match) {
      this.currentModuleId = +match[1];
    }
  }

  ngOnInit(): void {
    this.subscription = this.termService.getTerms().subscribe(
      (data) => {
        data.forEach(term => {
          if (term.moduleID === this.currentModuleId) {
            this.terms.push(term);
          }
        }
        );
      },
      (error) => {
        console.error('Error fetching user data: ', error);
      }
    );

    this.newsubscription = this.definitionService.getDefinitions().subscribe(
      (data) => {
        data.forEach(definition => {
          if (definition.moduleID === this.currentModuleId) {
            this.definitions.push(definition);
          }
        }
        );
      },
      (error) => {
        console.error('Error fetching user data: ', error);
      }
    );
  }

  /* Checks to make sure only one term and one definition are allowed to be turned over
     at the same time.*/
  cardTurnOverCheck(array: TermCard[] | DefinitionCard[]): boolean | undefined {
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

  resetCards(termCardArray: TermCard[], definitionCardArray: DefinitionCard[]) {

    console.log("Router defined:", this.router);
    let flippedCardCount: number = 0;
    let matchedCardCount: number = 0;
    let termCardId: string | undefined = "d";
    let definitionCardId: string | undefined = "s";

    // Find all cards that are flipped in both the term array and definition array
    definitionCardArray.forEach(function (definition) {
      if (definition.isFlipped === true && definition.state === 'default') {
        definitionCardId = definition._id;
        flippedCardCount += 1;
      }
      if (definition.state === 'matched') {
        matchedCardCount += 1;
      }
    });
    termCardArray.forEach(function (term) {
      if (term.isFlipped === true && term.state === 'default') {
        termCardId = term.definitionID;
        flippedCardCount += 1;
      }
    });

    /* if two or more cards total are flipped over and they are not a match, flip them back
       over. If they are a match they will stay flipped to show the name of the term and
       the definition
    */
    if (flippedCardCount >= 2) {
      if (termCardId === definitionCardId) {

        definitionCardArray.forEach(function (definition) {
          if (definition._id === definitionCardId) {
            definition.state = 'matched';
          }
        });
        termCardArray.forEach(function (term) {

          if (term.definitionID === termCardId) {
            term.state = 'matched';
          }
        });
      } else {
        definitionCardArray.forEach(function (definition) {
          if (definition.state === 'default') {
            definition.isFlipped = false;
          }
        });
        termCardArray.forEach(function (term) {
          if (term.state === 'default') {
            term.isFlipped = false;
          }
        });
      }
    }
  }

  // handles click event of definition cards
  definitionCardClicked(id: string) {
    if (this.cardTurnOverCheck(this.definitions) === true) {
      return;
    }

    this.definitions.forEach(function (definition) {
      if (definition._id === id) {
        if (definition.isFlipped === false) {
          definition.isFlipped = true;
        } else if (definition.state === 'matched') {
          definition.isFlipped = true;
        } else {
          definition.isFlipped = false;
        }
      }
    });

    setTimeout(this.resetCards, 2000, this.terms, this.definitions);
  }

  // handles click event of term cards
  termCardClicked(id: string) {
    if (this.cardTurnOverCheck(this.terms) === true) {
      return;
    }

    this.terms.forEach(function (term) {
      if (term._id === id) {
        if (term.isFlipped === false) {
          term.isFlipped = true;
        } else if (term.state === 'matched') {
          term.isFlipped = true;
        } else {
          term.isFlipped = false;
        }
      }
    });

    setTimeout(this.resetCards, 2000, this.terms, this.definitions);
  }

  allMatched(termCardArray: TermCard[]) {
    let matchedCardCount: number = 0

    termCardArray.forEach(function (term) {
      if (term.state === 'matched') {
        matchedCardCount += 1
      }
    })

    if (matchedCardCount === termCardArray.length) {
      alert("Congratulations, you matched all the cards!");
      this.router.navigateByUrl('/module')
    }
    else {
      alert("Please match all the cards.")
    }
  }

  //Unsubscribes from the backend upon leaving the home component page, which prevents multiple unnecessary backend calls
  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.newsubscription) {
      this.newsubscription.unsubscribe();
    }

  }
}
