import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashCard } from './flash-card';

describe('FlashCard', () => {
  let component: FlashCard;
  let fixture: ComponentFixture<FlashCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
