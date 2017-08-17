import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingBarService } from '../shared/loading-bar.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit, OnDestroy {

  loading: boolean;

  loadingBarSubscription: Subscription;

  constructor(private loadingBarService: LoadingBarService) { }

  ngOnInit() {
    this.loading = false;

    this.loadingBarSubscription = this.loadingBarService.loadingBarSubject
      .subscribe(
        (loading: boolean) => {
          this.loading = loading;
        }
      );
  }

  ngOnDestroy() {
    if (this.loadingBarSubscription) {
      this.loadingBarSubscription.unsubscribe();
    }
  }

}
