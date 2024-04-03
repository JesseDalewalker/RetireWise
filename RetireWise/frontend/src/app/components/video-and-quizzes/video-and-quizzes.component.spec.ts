import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAndQuizzesComponent } from './video-and-quizzes.component';

describe('VideoAndQuizzesComponent', () => {
  let component: VideoAndQuizzesComponent;
  let fixture: ComponentFixture<VideoAndQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoAndQuizzesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoAndQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
