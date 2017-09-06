import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '../../core/shared/http-client.service';
import { ParticipantData } from './participant-data.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { EventData } from './event-data.model';

@Injectable()
export class EventService {

  eventParticipantsSubject: Subject<ParticipantData[]> = new Subject<ParticipantData[]>();

  eventsSubject: Subject<EventData[]> = new Subject<EventData[]>();

  constructor(private http: HttpClient) {
  }

  getAllEvents(): Observable<EventData[]> {
    return this.http.get('/api/v1/events')
      .map(
        (response: Response) => {
          return <EventData[]>response.json().content;
        }
      );
  }

  getEventParticipants(eventId: number): Observable<ParticipantData[]> {
    return this.http.get('/api/v1/events/' + eventId + '/participants')
      .map(
        (response: Response) => {
          return <ParticipantData[]>response.json().content;
        }
      );
  }

}
