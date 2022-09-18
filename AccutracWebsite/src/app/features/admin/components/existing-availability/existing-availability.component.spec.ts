import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingAvailabilityComponent } from './existing-availability.component';

describe('ExistingAvailabilityComponent', () => {
  let component: ExistingAvailabilityComponent;
  let fixture: ComponentFixture<ExistingAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingAvailabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
