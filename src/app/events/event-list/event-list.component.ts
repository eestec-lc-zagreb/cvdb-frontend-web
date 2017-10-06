import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { EventData } from '../shared/event-data.model';
import { AlertService } from '../../core/alert.service';
import { CollectionViewer, DataSource } from '@angular/cdk';
import { Observable } from 'rxjs/Observable';
import { LoadingBarService } from '../../core/shared/loading-bar.service';
import { Language } from 'angular-l10n';
import { MdDialog, MdDialogRef, PageEvent } from '@angular/material';
import { Pagination } from '../../shared/pagination.model';
import { Page } from '../../shared/page.model';
import { UserCredentials } from '../../authentication/shared/user-credentials.model';
import { AuthenticationService } from '../../authentication/shared/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { EventDialogComponent } from '../../admin-panel/events/event-dialog/event-dialog.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

  events: EventData[];

  pagination: Pagination;

  eventsDataSource: EventsDataSource;
  eventChangeSubscription: Subscription;

  admin: boolean;

  @Language() lang: string;

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private alertService: AlertService,
              private loadingBarService: LoadingBarService,
              public dialog: MdDialog) {
  }

  ngOnInit() {
    this.events = [];
    this.pagination = new Pagination();
    this.eventsDataSource = new EventsDataSource(this.eventService);

    const currentUser: UserCredentials = AuthenticationService.getCurrentUser();
    const currentUrl: string = this.route.snapshot.parent.url.join();

    console.log(currentUser);
    console.log(currentUrl);

    this.admin = this.isAdmin(currentUser, currentUrl);

    // FIXME this.fetchEvents(0, this.pagination.pageSize);
    this.getEvents();

    this.eventChangeSubscription = this.eventService.eventChange.subscribe(() => this.getEvents());
  }

  ngOnDestroy() {
    if (this.eventChangeSubscription) {
      this.eventChangeSubscription.unsubscribe();
    }
  }

  fetchEvents(pageIndex: number, pageSize: number) {
    this.loadingBarService.start();

    this.eventService.getEvents(pageIndex, pageSize)
      .subscribe(
        (eventPage: Page<EventData>) => {
          this.events = eventPage.content;
          this.eventService.eventsSubject.next(this.events);

          this.pagination.length = eventPage.totalElements;
          this.pagination.pageSize = eventPage.size;

          this.loadingBarService.stop();
        },
        error => {
          this.alertService.error(error);

          this.loadingBarService.stop();
        }
      );
  }

  getEvents() {
    this.loadingBarService.start();

    this.eventService.getAllEvents()
      .subscribe(
        (eventPage: Page<EventData>) => {
          this.events = eventPage.content;
          this.eventService.eventsSubject.next(this.events);

          this.pagination.length = eventPage.totalElements;
          this.pagination.pageSize = eventPage.size;

          this.loadingBarService.stop();
        },
        error => {
          this.alertService.error(error);

          this.loadingBarService.stop();
        }
      );
  }

  onPageOptionsChange(page: PageEvent) {
    // FIXME this.fetchEvents(page.pageIndex, page.pageSize);
    console.log(page);
  }

  isAdmin(currentUser: UserCredentials, url: string) {
    return currentUser.role === 'ADMINISTRATOR' && url === 'admin';
  }

  onOpenEventDialog(editMode: boolean, eventId?: number) {
    this.openEventDialog(editMode, eventId);
  }

  private openEventDialog(editMode: boolean, eventId?: number): MdDialogRef<EventDialogComponent> {
    return this.dialog.open(EventDialogComponent, {
      data: {
        title: editMode ? 'EditEventButtonText' : 'AddNewEventButtonText',
        editMode: editMode,
        eventId: eventId
      },
      disableClose: true
    });
  }

}

export class EventsDataSource extends DataSource<EventData> {

  constructor(private eventService: EventService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<EventData[]> {
    return this.eventService.eventsSubject;
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }


}
