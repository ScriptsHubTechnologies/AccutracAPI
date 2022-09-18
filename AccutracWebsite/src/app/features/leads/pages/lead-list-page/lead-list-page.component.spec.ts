import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadListPageComponent } from './lead-list-page.component';

describe('LeadListPageComponent', () => {
  let component: LeadListPageComponent;
  let fixture: ComponentFixture<LeadListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
