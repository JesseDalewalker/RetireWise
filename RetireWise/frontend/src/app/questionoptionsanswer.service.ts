import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { QuestionOptionsAnswer } from '../../../backend/src/questionoptionsanswer';

@Injectable({
  providedIn: 'root',
})

export class QuestionOptionsAnswerService {
  private url = 'http://localhost:5200';
  private questionoptionsanswer$: Subject<QuestionOptionsAnswer[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  //GET crud operation for frontend
  getQuestionOptionsAnswers(): Subject<QuestionOptionsAnswer[]> {
    this.httpClient.get<QuestionOptionsAnswer[]>(`${this.url}/questionoptionsanswer`).subscribe((questionoptionsanswer) => {
      this.questionoptionsanswer$.next(questionoptionsanswer);
    });
    return this.questionoptionsanswer$;
  }
}
