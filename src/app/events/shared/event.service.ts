import { Injectable } from '@angular/core';
import { RequestOptions, Response, Headers, Http } from '@angular/http';
import { HttpClient } from '../../core/shared/http-client.service';
import { ParticipantData } from './participant-data.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { EventData } from './event-data.model';
import { Page } from '../../shared/page.model';

@Injectable()
export class EventService {

  eventParticipantsSubject: Subject<ParticipantData[]> = new Subject<ParticipantData[]>();

  eventsSubject: Subject<EventData[]> = new Subject<EventData[]>();

  eventChange: Subject<EventData> = new Subject<EventData>();

  constructor(private customHttpClient: HttpClient, private http: Http) {
  }

  createEvent(eventData: EventData): Observable<EventData> {
    return this.customHttpClient.post('/api/v1/events', eventData)
      .map(
        (response: Response) => {
          return <EventData>response.json();
        }
      );
  }

  updateEvent(eventData: EventData): Observable<EventData> {
    return this.customHttpClient.put(`/api/v1/events/${eventData.id}`, eventData)
      .map(
        (response: Response) => {
          return <EventData>response.json();
        }
      );
  }

  getAllEvents(): Observable<Page<EventData>> {
    return this.customHttpClient.get('/api/v1/events')
      .map(
        (response: Response) => {
          return <Page<EventData>>response.json();
        }
      );
  }

  getEvents(pageIndex: number, pageSize: number): Observable<Page<EventData>> {
    const pagination = '?page=' + pageIndex + '&size=' + pageSize;

    return this.customHttpClient.get('/api/v1/events' + pagination)
      .map(
        (response: Response) => {
          return <Page<EventData>>response.json();
        }
      );
  }

  getEvent(id: number): Observable<EventData> {
    return this.customHttpClient.get(`/api/v1/events/${id}`)
      .map(
        (response: Response) => {
          return <EventData>response.json();
        }
      );
  }

  getEventParticipants(eventId: number): Observable<ParticipantData[]> {
    return this.customHttpClient.get('/api/v1/events/' + eventId + '/participants')
      .map(
        (response: Response) => {
          return <ParticipantData[]>response.json().content;
        }
      );
  }

  addParticipantToEvent(eventId: number, fileList: FileList) {
    if (fileList.length > 0) {

      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);

      const headers = new Headers();

      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');

      const options = new RequestOptions({headers: headers});

      return this.http.post(`/api/v1/events/${eventId}/participants`, formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error));
    }
  }

}
