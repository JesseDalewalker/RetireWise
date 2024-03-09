import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Video } from '../../../backend/src/video';

@Injectable({
  providedIn: 'root',
})

export class VideoService {
  private url = 'http://localhost:5200';
  private videos$: Subject<Video[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  //GET crud operation for frontend
  getVideos(): Subject<Video[]> {
    this.httpClient.get<Video[]>(`${this.url}/videos`).subscribe((videos) => {
      this.videos$.next(videos);
    });
    return this.videos$;
  }
}
