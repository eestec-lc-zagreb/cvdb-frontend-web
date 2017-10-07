import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { UserData } from '../../dashboard/shared/user-data.model';
import { HttpClient } from '../../core/shared/http-client.service';
import { Observable } from 'rxjs/Observable';
import { Page } from 'app/shared/page.model';

@Injectable()
export class UserService {
  usersSubject: Subject<UserData[]> = new Subject<UserData[]>();

  userChange: Subject<UserData> = new Subject<UserData>();

  constructor(private http: HttpClient) {}

  createUser(userData: UserData): Observable<UserData> {
    return this.http.post('/api/v1/users', userData)
      .map(
        (response: Response) => {
          return <UserData>response.json();
        }
      );
  }

  updateUser(userData: UserData): Observable<UserData> {
    return this.http.put(`/api/v1/users/${userData.id}`, userData)
      .map(
        (response: Response) => {
          return <UserData>response.json();
        }
      );
  }

  getAllUsers(): Observable<Page<UserData>> {
    return this.http.get('/api/v1/users')
      .map(
        (response: Response) => {
          return <Page<UserData>>response.json();
        }
      );
  }

  getUsers(pageIndex: number, pageSize: number): Observable<Page<UserData>> {
    const pagination = '?page=' + pageIndex + '&size=' + pageSize;

    return this.http.get('/api/v1/users' + pagination)
      .map(
        (response: Response) => {
          return <Page<UserData>>response.json();
        }
      );
  }

  getUser(id: number): Observable<UserData> {
    return this.http.get(`/api/v1/users/${id}`)
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

    return this.http.post('/api/v1/users/' + id + '/change-password', requestBody);
  }
}
