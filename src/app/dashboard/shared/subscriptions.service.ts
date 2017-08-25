import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '../../core/shared/http-client.service';

@Injectable()
export class SubscriptionsService {

  constructor(private http: HttpClient) {}

  getActiveSubsctiptions(id: number): Observable<any> {
    return this.http.get('/api/v1/users/' + id + '/subscriptions')
      .map(
        (response: Response) => {
          const body = response.json();

          return body.content;
        }
      );
  }

}
