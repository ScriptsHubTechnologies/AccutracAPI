import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLeadDialogComponent } from './new-lead-dialog.component';

describe('NewLeadDialogComponent', () => {
  let component: NewLeadDialogComponent;
  let fixture: ComponentFixture<NewLeadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLeadDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLeadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
