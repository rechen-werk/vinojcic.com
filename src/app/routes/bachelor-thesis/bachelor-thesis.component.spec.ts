import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BachelorThesisComponent} from './bachelor-thesis.component';

describe('BachelorThesisComponent', () => {
  let component: BachelorThesisComponent;
  let fixture: ComponentFixture<BachelorThesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BachelorThesisComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BachelorThesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
