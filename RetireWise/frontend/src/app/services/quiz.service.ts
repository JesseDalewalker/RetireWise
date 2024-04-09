import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Quiz } from '../../../../backend/src/models/quiz';

@Injectable({
  providedIn: 'root',
})

export class QuizService {
  private url = 'http://localhost:5200';
  private quiz$: Subject<Quiz[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  //GET crud operation for frontend
  getQuizzes(): Subject<Quiz[]> {
    this.httpClient.get<Quiz[]>(`${this.url}/quiz`).subscribe((quiz) => {
      this.quiz$.next(quiz);
    });
    return this.quiz$;
  }
}

