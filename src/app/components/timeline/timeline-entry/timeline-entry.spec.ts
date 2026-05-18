import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineEntry } from './timeline-entry';

describe('TimelineEntry', () => {
  let component: TimelineEntry;
  let fixture: ComponentFixture<TimelineEntry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineEntry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineEntry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
