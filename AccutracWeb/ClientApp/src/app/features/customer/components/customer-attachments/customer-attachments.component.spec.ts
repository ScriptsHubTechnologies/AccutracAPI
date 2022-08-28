import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAttachmentsComponent } from './customer-attachments.component';

describe('CustomerAttachmentsComponent', () => {
  let component: CustomerAttachmentsComponent;
  let fixture: ComponentFixture<CustomerAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAttachmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
