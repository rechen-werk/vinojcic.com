import {Component, Input} from '@angular/core';
import {ApplicationWidget} from "../../../../model/ApplicationWidget";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'widget',
  imports: [],
  templateUrl: './widget.html',
  styleUrl: './widget.scss',
})
export class Widget {
  @Input() widget!: ApplicationWidget;
  constructor(
    private router: Router,
    protected sanitizer: DomSanitizer
  ) {}
  open(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl(`${this.widget.path}`);
  }
}
