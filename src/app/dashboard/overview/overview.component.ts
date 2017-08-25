import { Component, OnInit } from '@angular/core';
import { Language } from 'angular-l10n';
import { SubscriptionsService } from '../shared/subscriptions.service';
import { SubscriptionData } from '../shared/subscription-data.model';
import { LoadingBarService } from '../../core/shared/loading-bar.service';
import { AuthenticationService } from '../../authentication/shared/authentication.service';
import { UserCredentials } from '../../authentication/shared/user-credentials.model';
import { AlertService } from '../../core/alert.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  @Language() lang: string;

  subscriptions: SubscriptionData[];

  constructor(
    private subscriptionsService: SubscriptionsService,
    private loadingBarService: LoadingBarService,
    private alertService: AlertService) { }

  ngOnInit() {
    const currentUser: UserCredentials = AuthenticationService.getCurrentUser();

    this.loadingBarService.start();

    this.subscriptionsService.getActiveSubsctiptions(currentUser.id)
      .subscribe(
        (subscriptions: SubscriptionData[]) => {
          this.subscriptions = subscriptions;

          this.loadingBarService.stop();
        },
        error => {
          this.loadingBarService.stop();

          this.alertService.error('Error while fetching subscriptions');
        }
      );
  }

}
