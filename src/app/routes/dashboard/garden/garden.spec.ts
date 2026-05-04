import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Garden } from './garden';

describe('Garden', () => {
  let component: Garden;
  let fixture: ComponentFixture<Garden>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Garden]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Garden);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
