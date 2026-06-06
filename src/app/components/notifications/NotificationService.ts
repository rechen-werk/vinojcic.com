import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationItem } from './NotificationItem';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<NotificationItem[]>([]);
  notifications$ = this.notificationsSubject.asObservable();
  private currentId = 0;
  private defaultDuration = 5000;

  success(message: string, duration = this.defaultDuration) { this.show(message, 'success', duration); }
  error(message: string, duration = this.defaultDuration) { this.show(message, 'error', duration); }
  warning(message: string, duration = this.defaultDuration) { this.show(message, 'warning', duration); }
  info(message: string, duration = this.defaultDuration) { this.show(message, 'info', duration); }

  private show(message: string, type: NotificationItem['type'], duration: number) {
    const notification: NotificationItem = {
      id: ++this.currentId,
      message,
      type
    };

    const current = this.notificationsSubject.value;
    this.notificationsSubject.next([ ...current, notification ]);
    setTimeout(() => { this.remove(notification.id); }, duration);
  }

  remove(id: number) {
    this.notificationsSubject.next(
      this.notificationsSubject.value.filter(
        n => n.id !== id
      )
    );
  }
}
