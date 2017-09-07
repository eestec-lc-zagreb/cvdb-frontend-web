import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpClient {

  static defaultRequestOptions(): RequestOptions {
    const headers = new Headers({'Content-Type': 'application/json'});

    return new RequestOptions({headers: headers, withCredentials: true});
  }

  constructor(private http: Http) {
  }

  get(url: string): Observable<Response> {
    return this.http.get(url, HttpClient.defaultRequestOptions());
  }

  post(url: string, body: any): Observable<Response> {
    return this.http.post(url, body, HttpClient.defaultRequestOptions());
  }

  put(url: string, body: any): Observable<Response> {
    return this.http.put(url, body, HttpClient.defaultRequestOptions());
  }

}
