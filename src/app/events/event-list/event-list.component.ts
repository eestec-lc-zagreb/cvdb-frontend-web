import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { EventData } from '../shared/event-data.model';
import { AlertService } from '../../core/alert.service';
import { CollectionViewer, DataSource } from '@angular/cdk';
import { Observable } from 'rxjs/Observable';
import { LoadingBarService } from '../../core/shared/loading-bar.service';
import { Language } from 'angular-l10n';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events: EventData[];

  eventsDataSource: EventsDataSource;

  @Language() private lang: string;

  constructor(private eventService: EventService,
              private alertService: AlertService,
              private loadingBarService: LoadingBarService) {
  }

  ngOnInit() {
    this.events = [];
    this.eventsDataSource = new EventsDataSource(this.eventService);

    this.loadingBarService.start();
    this.eventService.getAllEvents()
      .subscribe(
        (events: EventData[]) => {
          this.events = events;
          this.eventService.eventsSubject.next(this.events);

          this.loadingBarService.stop();
        },
        error => {
          this.alertService.error(error);

          this.loadingBarService.stop();
        }
      );
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
