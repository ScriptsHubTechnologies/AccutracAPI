import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartSchedulerComponent } from './smart-scheduler.component';

describe('SmartSchedulerComponent', () => {
  let component: SmartSchedulerComponent;
  let fixture: ComponentFixture<SmartSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartSchedulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
