import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualsComponent } from './visuals.component';

describe('VisualsComponent', () => {
  let component: VisualsComponent;
  let fixture: ComponentFixture<VisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
