import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAvailabilityComponent } from './new-availability.component';

describe('NewAvailabilityComponent', () => {
  let component: NewAvailabilityComponent;
  let fixture: ComponentFixture<NewAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAvailabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
