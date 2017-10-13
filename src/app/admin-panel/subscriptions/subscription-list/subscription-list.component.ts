import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionAdminData } from '../shared/subscription-admin-data.model';
import { Pagination } from '../../../shared/pagination.model';
import { Language } from 'angular-l10n';
import { DataSource } from '@angular/cdk/collections';
import { SubscriptionsService } from '../../../dashboard/shared/subscriptions.service';
import { Observable } from 'rxjs/Observable';
import { LoadingBarService } from 'app/core/shared/loading-bar.service';
import { AlertService } from '../../../core/alert.service';
import { MatDialog, MatDialogRef, PageEvent } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Page } from 'app/shared/page.model';
import { SubscriptionDialogComponent } from '../subscription-dialog/subscription-dialog.component';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit, OnDestroy {

  subscriptions: SubscriptionAdminData[];

  pagination: Pagination;

  subscriptionsDataSource: SubscriptionsDataSource;
  subscriptionChangeSubscription: Subscription;

  @Language() lang: string;

  constructor(private subscriptionService: SubscriptionsService,
              private alertService: AlertService,
              private loadingBarService: LoadingBarService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.subscriptions = [];
    this.pagination = new Pagination();
    this.subscriptionsDataSource = new SubscriptionsDataSource(this.subscriptionService);

    // FIXME this.fetchStudents(0, this.pagination.pageSize);
    this.getStudents();

    this.subscriptionChangeSubscription = this.subscriptionService.subscriptionChange.subscribe(() => this.getStudents());
  }

  ngOnDestroy() {
    if (this.subscriptionChangeSubscription) {
      this.subscriptionChangeSubscription.unsubscribe();
    }
  }

  onPageOptionsChange(page: PageEvent) {
    // FIXME this.fetchSubscriptions(page.pageIndex, page.pageSize);
    console.log(page);
  }

  getStudents() {
    this.loadingBarService.start();

    this.subscriptionService.getAllSubscriptions()
      .subscribe(
        (subscriptionPage: Page<SubscriptionAdminData>) => {
          this.subscriptions = subscriptionPage.content;
          this.subscriptionService.subscriptionsSubject.next(this.subscriptions);

          this.pagination.length = subscriptionPage.totalElements;
          this.pagination.pageSize = subscriptionPage.size;

          this.loadingBarService.stop();
        },
        error => {
          this.alertService.error(error);

          this.loadingBarService.stop();
        }
      );
  }

  onOpenSubscriptionDialog(editMode: boolean, subscriptionId?: number) {
    this.openSubscriptionDialog(editMode, subscriptionId);
  }

  private openSubscriptionDialog(editMode: boolean, subscriptionId?: number): MatDialogRef<SubscriptionDialogComponent> {
    return this.dialog.open(SubscriptionDialogComponent, {
      data: {
        title: editMode ? 'EditSubscriptionButtonText' : 'AddNewSubscriptionButtonText',
        editMode: editMode,
        subscriptionId: subscriptionId
      },
      disableClose: true
    });
  }

}

export class SubscriptionsDataSource extends DataSource<SubscriptionAdminData> {

  constructor(private subscriptionsService: SubscriptionsService) {
    super();
  }

  connect(): Observable<SubscriptionAdminData[]> {
    return this.subscriptionsService.subscriptionsSubject;
  }

  disconnect(): void {
  }


}
