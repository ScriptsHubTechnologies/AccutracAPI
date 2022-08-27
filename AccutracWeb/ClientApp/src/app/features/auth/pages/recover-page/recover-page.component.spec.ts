import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverPageComponent } from './recover-page.component';

describe('RecoverPageComponent', () => {
  let component: RecoverPageComponent;
  let fixture: ComponentFixture<RecoverPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
