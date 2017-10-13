import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '../../core/shared/http-client.service';
import { Page } from '../../shared/page.model';
import { SubscriptionAdminData } from '../../admin-panel/subscriptions/shared/subscription-admin-data.model';
import { Subject } from 'rxjs/Subject';
import { SubscriptionBasicData } from '../../admin-panel/subscriptions/shared/subscription-basic-data.model';

@Injectable()
export class SubscriptionsService {

  subscriptionsSubject: Subject<SubscriptionAdminData[]> = new Subject<SubscriptionAdminData[]>();

  subscriptionChange: Subject<SubscriptionBasicData> = new Subject<SubscriptionBasicData>();

  constructor(private http: HttpClient) {}

  createSubscription(subscriptionData: SubscriptionBasicData): Observable<SubscriptionBasicData> {
    return this.http.post('/api/v1/subscriptions', subscriptionData)
      .map(
        (response: Response) => {
          return <SubscriptionBasicData>response.json();
        }
      );
  }

  updateSubscription(subscriptionData: SubscriptionBasicData): Observable<SubscriptionBasicData> {
    return this.http.put(`/api/v1/subscriptions/${subscriptionData.id}`, subscriptionData)
      .map(
        (response: Response) => {
          return <SubscriptionBasicData>response.json();
        }
      );
  }

  getActiveSubsctiptions(id: number): Observable<any> {
    return this.http.get('/api/v1/users/' + id + '/subscriptions')
      .map(
        (response: Response) => {
          const body = response.json();

          return body.content;
        }
      );
  }

  getAllSubscriptions(): Observable<Page<SubscriptionAdminData>> {
    return this.http.get('/api/v1/subscriptions')
      .map(
        (response: Response) => {
          const body = response.json();

          return body;
        }
      );
  }

  getSubscriptions(pageIndex: number, pageSize: number): Observable<Page<SubscriptionAdminData>> {
    const pagination = '?page=' + pageIndex + '&size=' + pageSize;

    return this.http.get('/api/v1/subscriptions' + pagination)
      .map(
        (response: Response) => {
          return <Page<SubscriptionAdminData>>response.json();
        }
      );
  }

  getSubscription(id: number): Observable<SubscriptionBasicData> {
    return this.http.get(`/api/v1/subscriptions/${id}`)
      .map(
        (response: Response) => {
          return <SubscriptionBasicData>response.json();
        }
      );
  }

}
