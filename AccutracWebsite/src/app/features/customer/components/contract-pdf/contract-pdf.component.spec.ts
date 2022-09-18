import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateContract } from './contract-pdf.component';

describe('GenerateContract', () => {
  let component: GenerateContract;
  let fixture: ComponentFixture<GenerateContract>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateContract ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateContract);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
