import { Component } from '@angular/core';
import { NotificationService } from "../NotificationService"
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {NotificationItem} from "../NotificationItem";


@Component({
  selector: 'notification',
  imports: [ AsyncPipe ],
  standalone: true,
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
})
export class Notification {
  protected readonly notifications$: Observable<NotificationItem[]>;
  constructor(
    private notificationService: NotificationService
  ) {
    this.notifications$ = this.notificationService.notifications$;
  }

  close(id: number) {
    this.notificationService.remove(id);
  }
}
