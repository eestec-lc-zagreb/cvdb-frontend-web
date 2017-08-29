import { Component, Input, OnInit } from '@angular/core';
import { ParticipantData } from '../shared/participant-data.model';
import { CollectionViewer, DataSource } from '@angular/cdk';
import { Observable } from 'rxjs/Observable';
import { EventService } from '../shared/event.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../core/alert.service';
import { LoadingBarService } from '../../core/shared/loading-bar.service';
import { Language } from "angular-l10n";

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

  eventId: number;
  participants: ParticipantData[];

  participantsDataSource: ParticipantsDataSource;

  @Language() lang: string;

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private alertService: AlertService,
              private loadingBarService: LoadingBarService) { }

  ngOnInit() {
    this.eventId = +this.route.snapshot.params['id'];
    this.participantsDataSource = new ParticipantsDataSource(this.eventService);

    this.getParticipantsForEvent();
  }

  getParticipantsForEvent() {
    this.loadingBarService.start();

    this.eventService.getEventParticipants(this.eventId)
      .subscribe(
        (participants: ParticipantData[]) => {
          this.participants = participants;
          this.eventService.eventParticipantsSubject.next(participants);

          this.loadingBarService.stop();
        },
        error => {
          this.alertService.error(error);

          this.loadingBarService.stop();
        }
      );
  }

}

export class ParticipantsDataSource extends DataSource<ParticipantData> {

  constructor(private eventService: EventService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<ParticipantData[]> {
    return this.eventService.eventParticipantsSubject;
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

}
