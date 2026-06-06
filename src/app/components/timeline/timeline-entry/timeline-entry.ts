import {Component, Input} from '@angular/core';
import {TimeEntry} from "../../../../model/TimeEntry";

@Component({
  selector: 'timeline-entry',
  imports: [],
  templateUrl: './timeline-entry.html',
  styleUrl: './timeline-entry.scss',
})
export class TimelineEntry {
    @Input() entry!: TimeEntry;
}
