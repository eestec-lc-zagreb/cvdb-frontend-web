import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { LoadingBarService } from '../../../core/shared/loading-bar.service';
import { EventService } from '../../../events/shared/event.service';
import { NgForm } from '@angular/forms';
import { EventData } from '../../../events/shared/event-data.model';
import { AlertService } from '../../../core/alert.service';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnInit {

  event: EventData;

  constructor(public dialogRef: MdDialogRef<EventDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: any,
              private loadingBarService: LoadingBarService,
              private alertService: AlertService,
              private eventService: EventService) { }

  ngOnInit() {
    this.event = new EventData();

    if (this.data.editMode) {
      this.getEventData();
    }
  }

  onSubmitEventData(form: NgForm) {
    console.log(this.event);
  }

  getEventData() {
    this.loadingBarService.start();

    this.eventService.getEvent(this.data.eventId)
      .subscribe(
        (event: EventData) => {
          this.event = event;

          this.loadingBarService.stop();
        },
        error => {
          this.alertService.error(error);

          this.loadingBarService.stop();
        }
      );
  }

}
