import {Component, Input} from '@angular/core';
import {TimeEntry} from "../../../../model/TimeEntry";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'timeline-entry',
  imports: [
    TranslatePipe
  ],
  templateUrl: './timeline-entry.html',
  styleUrl: './timeline-entry.scss',
})
export class TimelineEntry {
    @Input() entry!: TimeEntry;
}
