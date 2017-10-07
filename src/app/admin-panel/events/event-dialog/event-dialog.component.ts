import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LoadingBarService } from '../../../core/shared/loading-bar.service';
import { EventService } from '../../../events/shared/event.service';
import { EventData } from '../../../events/shared/event-data.model';
import { AlertService } from '../../../core/alert.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnInit {

  event: EventData;

  constructor(public dialogRef: MatDialogRef<EventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private loadingBarService: LoadingBarService,
              private alertService: AlertService,
              private eventService: EventService) { }

  ngOnInit() {
    this.event = new EventData();

    if (this.data.editMode) {
      this.getEventData();
    }
  }

  onSubmitEventData() {
    this.loadingBarService.start();

    let eventDataObservable: Observable<EventData>;

    if (this.data.editMode) {
      eventDataObservable = this.eventService.updateEvent(this.event);
    } else {
      eventDataObservable = this.eventService.createEvent(this.event);
    }

    eventDataObservable.subscribe(
      (eventData: EventData) => {
        this.eventService.eventChange.next(eventData);

        let eventMessage;
        if (this.data.editMode) {
          eventMessage = 'Event updated';
        } else {
          eventMessage = 'Event created';
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

  getEventData() {
    this.eventService.getEvent(this.data.eventId)
      .subscribe(
        (event: EventData) => {
          this.event = event;

        },
        error => {
          this.alertService.error(error);

        }
      );
  }

}
