import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '../../core/shared/http-client.service';
import { UserData } from './user-data.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserDetails(id: number): Observable<UserData> {
    return this.http.get('/api/v1/users/' + id)
      .map(
        (response: Response) => {
          return <UserData>response.json();
        }
      );
  }

  changePassword(id: number, oldPassword: string, newPassword: string, confirmation: string): Observable<Response> {
    const requestBody: any = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmation: confirmation
    };

    return this.http.post('/api/v1/users/' + id, requestBody);
  }

  updateUserData(id: number, name: string): Observable<Response> {
    const requestBody: any = {
      name: name,
    };

    return this.http.put('/api/v1/users/' + id, requestBody);
  }
}
