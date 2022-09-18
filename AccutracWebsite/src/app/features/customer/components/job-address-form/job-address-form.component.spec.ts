import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAddressFormComponent } from './job-address-form.component';

describe('JobAddressFormComponent', () => {
  let component: JobAddressFormComponent;
  let fixture: ComponentFixture<JobAddressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobAddressFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
