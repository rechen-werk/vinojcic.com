import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private showSidebarSubject = new BehaviorSubject<boolean>(window.innerWidth >= 576);
  showSidebar$ = this.showSidebarSubject.asObservable();

  constructor() {

  }
  toggleSidebar() {
    this.showSidebarSubject.next(!this.showSidebarSubject.value);
  }
}
