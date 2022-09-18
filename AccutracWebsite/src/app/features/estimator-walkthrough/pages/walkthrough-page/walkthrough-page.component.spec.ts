import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkthroughPageComponent } from './walkthrough-page.component';

describe('WalkthroughPageComponent', () => {
  let component: WalkthroughPageComponent;
  let fixture: ComponentFixture<WalkthroughPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkthroughPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalkthroughPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
