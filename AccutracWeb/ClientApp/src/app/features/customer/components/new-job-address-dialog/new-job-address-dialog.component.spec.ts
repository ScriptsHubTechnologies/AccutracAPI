import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJobAddressDialogComponent } from './new-job-address-dialog.component';

describe('NewJobAddressDialogComponent', () => {
  let component: NewJobAddressDialogComponent;
  let fixture: ComponentFixture<NewJobAddressDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewJobAddressDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewJobAddressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
