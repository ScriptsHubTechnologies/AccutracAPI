import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAndSignComponent } from './review-and-sign.component';

describe('ReviewAndSignComponent', () => {
  let component: ReviewAndSignComponent;
  let fixture: ComponentFixture<ReviewAndSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewAndSignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewAndSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
