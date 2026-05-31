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

  success(message: string) { this.show(message, 'success'); }
  error(message: string) { this.show(message, 'error'); }
  warning(message: string) { this.show(message, 'warning'); }
  info(message: string) { this.show(message, 'info'); }

  private show(message: string, type: NotificationItem['type'], duration = 5000) {
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
