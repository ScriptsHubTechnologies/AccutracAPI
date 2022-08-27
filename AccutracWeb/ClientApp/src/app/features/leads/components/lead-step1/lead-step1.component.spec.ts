import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadStep1Component } from './lead-step1.component';

describe('LeadStep1Component', () => {
  let component: LeadStep1Component;
  let fixture: ComponentFixture<LeadStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadStep1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
