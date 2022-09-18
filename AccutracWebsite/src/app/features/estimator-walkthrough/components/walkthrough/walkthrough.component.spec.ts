import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkthroughComponent } from './walkthrough.component';

describe('WalkthroughComponent', () => {
  let component: WalkthroughComponent;
  let fixture: ComponentFixture<WalkthroughComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkthroughComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalkthroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
