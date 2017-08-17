import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoadingBarService {

  loadingBarSubject: Subject<boolean>;

  constructor() {
    this.loadingBarSubject = new Subject<boolean>();
  }

  start() {
    this.loadingBarSubject.next(true);
  }

  stop() {
    this.loadingBarSubject.next(false);
  }

}
