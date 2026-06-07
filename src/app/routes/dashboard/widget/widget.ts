import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ApplicationWidget} from "../../../../model/ApplicationWidget";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'widget',
  imports: [],
  templateUrl: './widget.html',
  styleUrl: './widget.scss',
})
export class Widget implements OnInit{
  @Input() widget!: ApplicationWidget;
  preview!: String;
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.http.get(`${environment.API_BASE_URL}${this.widget.path}/preview`, { responseType: 'text', withCredentials: true }).subscribe(res => this.preview = res);
  }

  @HostListener('click', ['$event'])
  open(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl(`${this.widget.frontend}`);
  }
}
