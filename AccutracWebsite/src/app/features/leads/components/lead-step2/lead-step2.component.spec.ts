import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadStep2Component } from './lead-step2.component';

describe('LeadStep2Component', () => {
  let component: LeadStep2Component;
  let fixture: ComponentFixture<LeadStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadStep2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
