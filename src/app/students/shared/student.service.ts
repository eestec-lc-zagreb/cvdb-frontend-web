import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { StudentData } from './student-data.model';
import { HttpClient } from '../../core/shared/http-client.service';
import { Observable } from 'rxjs/Observable';
import { Page } from '../../shared/page.model';
import { EventData } from '../../events/shared/event-data.model';

@Injectable()
export class StudentService {
  studentsSubject: Subject<StudentData[]> = new Subject<StudentData[]>();

  studentChange: Subject<StudentData> = new Subject<StudentData>();

  constructor(private http: HttpClient) {
  }

  createStudent(studentData: StudentData): Observable<StudentData> {
    return this.http.post('/api/v1/students', studentData)
      .map(
        (response: Response) => {
          return <StudentData>response.json();
        }
      );
  }

  updateStudent(studentData: StudentData): Observable<StudentData> {
    return this.http.put(`/api/v1/students/${studentData.id}`, studentData)
      .map(
        (response: Response) => {
          return <StudentData>response.json();
        }
      );
  }

  getAllStudents(): Observable<Page<StudentData>> {
    return this.http.get('/api/v1/students')
      .map(
        (response: Response) => {
          return <Page<StudentData>>response.json();
        }
      );
  }

  getStudents(pageIndex: number, pageSize: number): Observable<Page<StudentData>> {
    const pagination = '?page=' + pageIndex + '&size=' + pageSize;

    return this.http.get('/api/v1/students' + pagination)
      .map(
        (response: Response) => {
          return <Page<StudentData>>response.json();
        }
      );
  }

  getStudent(id: number): Observable<StudentData> {
    return this.http.get(`/api/v1/students/${id}`)
      .map(
        (response: Response) => {
          return <StudentData>response.json();
        }
      );
  }

  getUsersEvents(userId: number): Observable<EventData[]> {
    return this.http.get('/api/v1/users/' + userId + '/events')
      .map(
        (response: Response) => {
          return <EventData[]>response.json().content;
        }
      );
  }
}
