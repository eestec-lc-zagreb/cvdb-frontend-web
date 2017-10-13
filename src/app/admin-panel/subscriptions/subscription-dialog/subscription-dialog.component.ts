import { Component, Inject, OnInit } from '@angular/core';
import { SubscriptionAdminData } from '../shared/subscription-admin-data.model';
import { UserData } from '../../../dashboard/shared/user-data.model';
import { EventData } from '../../../events/shared/event-data.model';
import { Language } from 'angular-l10n';
import { DateAdapter, MAT_DIALOG_DATA, MatDialogRef, NativeDateAdapter } from '@angular/material';
import { LoadingBarService } from '../../../core/shared/loading-bar.service';
import { AlertService } from '../../../core/alert.service';
import { SubscriptionsService } from '../../../dashboard/shared/subscriptions.service';
import { UserService } from '../../../users/shared/user.service';
import { EventService } from '../../../events/shared/event.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { SubscriptionBasicData } from '../shared/subscription-basic-data.model';

@Component({
  selector: 'app-subscription-dialog',
  templateUrl: './subscription-dialog.component.html',
  styleUrls: ['./subscription-dialog.component.scss']
})
export class SubscriptionDialogComponent implements OnInit {

  subscription: SubscriptionBasicData;

  users: UserData[];
  events: EventData[];

  @Language() lang: string;

  constructor(public dialogRef: MatDialogRef<SubscriptionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dateAdapter: DateAdapter<NativeDateAdapter>,
              private loadingBarService: LoadingBarService,
              private alertService: AlertService,
              private userService: UserService,
              private eventService: EventService,
              private subscriptionService: SubscriptionsService) { }

  ngOnInit() {
    this.dateAdapter.setLocale('hr-HR');
    this.subscription = new SubscriptionBasicData();
    this.users = [];
    this.events = [];

    if (this.data.editMode) {
      this.getSubscriptionData();
    }

    this.getData();
  }

  onSubmitSubscriptionData() {
    this.loadingBarService.start();

    let subscriptionDataObservable: Observable<SubscriptionBasicData>;

    if (this.data.editMode) {
      subscriptionDataObservable = this.subscriptionService.updateSubscription(this.subscription);
    } else {
      subscriptionDataObservable = this.subscriptionService.createSubscription(this.subscription);
    }

    subscriptionDataObservable.subscribe(
      (subscriptionData: SubscriptionBasicData) => {
        this.subscriptionService.subscriptionChange.next(subscriptionData);

        let eventMessage;
        if (this.data.editMode) {
          eventMessage = 'SubscriptionUpdatedMessage';
        } else {
          eventMessage = 'SubscriptionCreatedMessage';
        }

        this.alertService.success(eventMessage);
        this.loadingBarService.stop();

        this.dialogRef.close();
      },
      error => {
        console.error(error);

        this.alertService.error(error);
        this.loadingBarService.stop();

        this.dialogRef.close();
      }
    );
  }

  getSubscriptionData() {
    this.subscriptionService.getSubscription(this.data.subscriptionId)
      .subscribe(
        (subscription: SubscriptionBasicData) => {
          this.subscription = subscription;

        },
        error => {
          this.alertService.error(error);

        }
      );
  }

  getData() {
    Observable.forkJoin(
      this.userService.getAllUsers(),
      this.eventService.getAllEvents()
    ).subscribe(
      values => {
        this.users = values[0].content;
        this.events = values[1].content;
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

}
