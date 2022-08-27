import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerJobAddressesComponent } from './customer-job-addresses.component';

describe('CustomerJobAddressesComponent', () => {
  let component: CustomerJobAddressesComponent;
  let fixture: ComponentFixture<CustomerJobAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerJobAddressesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerJobAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
