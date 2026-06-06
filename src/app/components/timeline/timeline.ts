import {Component, Input} from '@angular/core';
import {TimeEntry} from "../../../model/TimeEntry";
import {TimelineEntry} from "./timeline-entry/timeline-entry";

@Component({
  selector: 'timeline',
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
  imports: [
    TimelineEntry
  ]
})
export class Timeline {
  @Input() entries!: TimeEntry[];
}
