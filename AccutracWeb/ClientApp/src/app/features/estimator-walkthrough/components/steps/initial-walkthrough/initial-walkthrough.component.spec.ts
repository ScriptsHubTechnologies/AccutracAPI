import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialWalkthroughComponent } from './initial-walkthrough.component';

describe('InitialWalkthroughComponent', () => {
  let component: InitialWalkthroughComponent;
  let fixture: ComponentFixture<InitialWalkthroughComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialWalkthroughComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialWalkthroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
