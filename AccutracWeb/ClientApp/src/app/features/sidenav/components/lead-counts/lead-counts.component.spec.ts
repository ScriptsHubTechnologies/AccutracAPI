import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCountsComponent } from './lead-counts.component';

describe('LeadCountsComponent', () => {
  let component: LeadCountsComponent;
  let fixture: ComponentFixture<LeadCountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadCountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
