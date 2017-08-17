import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserCredentials } from './user-credentials.model';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { AlertService } from '../../core/alert.service';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http, private router: Router, private alertService: AlertService) {
  }

  login(username: string, password: string): Observable<UserCredentials> {
    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    const options = new RequestOptions({headers: headers, withCredentials: true});

    const credentials = 'username=' + username + '&password=' + password;

    return this.http.post('/api/v1/auth/login', credentials, options)
      .map(this.extractData);
  }

  logout() {
    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.get('/api/v1/auth/login', options)
      .subscribe(
        response => {
          if (response.status === 200) {
            localStorage.removeItem('loggedUser');

            this.alertService.success('You successfully logged out');
            this.router.navigate(['/login']);
          } else {
            this.alertService.error('Something went wrong');
          }
        }
      );
  }

  private extractData(res: Response): UserCredentials {
    const body = res.json();

    sessionStorage.setItem('currentUser', JSON.stringify(body));
    const currentUser: UserCredentials = <UserCredentials>body;

    return currentUser;
  }

}