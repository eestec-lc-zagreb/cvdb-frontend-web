import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { EventData } from '../shared/event-data.model';
import { AlertService } from '../../core/alert.service';
import { CollectionViewer, DataSource } from '@angular/cdk';
import { Observable } from 'rxjs/Observable';
import { LoadingBarService } from '../../core/shared/loading-bar.service';
import { Language } from 'angular-l10n';
import { PageEvent } from '@angular/material';
import { Pagination } from '../../shared/pagination.model';
import { Page } from '../../shared/page.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events: EventData[];

  pagination: Pagination;

  eventsDataSource: EventsDataSource;

  @Language() private lang: string;

  constructor(private eventService: EventService,
              private alertService: AlertService,
              private loadingBarService: LoadingBarService) {
  }

  ngOnInit() {
    this.events = [];
    this.pagination = new Pagination();
    this.eventsDataSource = new EventsDataSource(this.eventService);

    // FIXME this.fetchEvents(0, this.pagination.pageSize);
    this.getEvents();
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
