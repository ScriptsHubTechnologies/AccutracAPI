import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentsComponent_EW } from './attachments.component';

describe('AttachmentsComponent', () => {
  let component: AttachmentsComponent_EW;
  let fixture: ComponentFixture<AttachmentsComponent_EW>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttachmentsComponent_EW ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachmentsComponent_EW);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
