import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagueSwitcherComponent } from './languague-switcher.component';

describe('LanguagueSwitcherComponent', () => {
  let component: LanguagueSwitcherComponent;
  let fixture: ComponentFixture<LanguagueSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguagueSwitcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguagueSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
