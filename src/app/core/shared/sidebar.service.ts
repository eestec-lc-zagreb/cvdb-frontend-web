import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidebarService {
  toggleSubject: Subject<boolean> = new Subject<boolean>();

  toggleMenu() {
    this.toggleSubject.next(true);
  }
}
