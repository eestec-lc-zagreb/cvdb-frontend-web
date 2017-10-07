import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentData } from '../shared/student-data.model';
import { Pagination } from '../../shared/pagination.model';
import { Subscription } from 'rxjs/Subscription';
import { Language } from 'angular-l10n';
import { DataSource } from '@angular/cdk/collections';
import { StudentService } from '../shared/student.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../core/alert.service';
import { LoadingBarService } from '../../core/shared/loading-bar.service';
import { MatDialog, MatDialogRef, PageEvent } from '@angular/material';
import { UserCredentials } from '../../authentication/shared/user-credentials.model';
import { AuthenticationService } from 'app/authentication/shared/authentication.service';
import { Page } from '../../shared/page.model';
import { StudentDialogComponent } from '../../admin-panel/students/student-dialog/student-dialog.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, OnDestroy {

  students: StudentData[];

  pagination: Pagination;

  studentsDataSource: StudentsDataSource;
  studentChangeSubscription: Subscription;

  admin: boolean;

  @Language() lang: string;

  constructor(private route: ActivatedRoute,
              private studentService: StudentService,
              private alertService: AlertService,
              private loadingBarService: LoadingBarService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.students = [];
    this.pagination = new Pagination();
    this.studentsDataSource = new StudentsDataSource(this.studentService);

    const currentUser: UserCredentials = AuthenticationService.getCurrentUser();
    const currentUrl: string = this.route.snapshot.parent.url.join();

    console.log(currentUser);
    console.log(currentUrl);

    this.admin = this.isAdmin(currentUser, currentUrl);

    // FIXME this.fetchStudents(0, this.pagination.pageSize);
    this.getStudents();

    this.studentChangeSubscription = this.studentService.studentChange.subscribe(() => this.getStudents());
  }


  ngOnDestroy() {
    if (this.studentChangeSubscription) {
      this.studentChangeSubscription.unsubscribe();
    }
  }

  onPageOptionsChange(page: PageEvent) {
    // FIXME this.fetchStudents(page.pageIndex, page.pageSize);
    console.log(page);
  }

  getStudents() {
    this.loadingBarService.start();

    this.studentService.getAllStudents()
      .subscribe(
        (studentPage: Page<StudentData>) => {
          this.students = studentPage.content;
          this.studentService.studentsSubject.next(this.students);

          this.pagination.length = studentPage.totalElements;
          this.pagination.pageSize = studentPage.size;

          this.loadingBarService.stop();
        },
        error => {
          this.alertService.error(error);

          this.loadingBarService.stop();
        }
      );
  }

  isAdmin(currentUser: UserCredentials, url: string) {
    return currentUser.role === 'ADMINISTRATOR' && url === 'admin';
  }

  onOpenStudentDialog(editMode: boolean, studentId?: number) {
    this.openStudentDialog(editMode, studentId);
  }

  private openStudentDialog(editMode: boolean, studentId?: number): MatDialogRef<StudentDialogComponent> {
    return this.dialog.open(StudentDialogComponent, {
      data: {
        title: editMode ? 'EditStudentButtonText' : 'AddNewStudentButtonText',
        editMode: editMode,
        studentId: studentId
      },
      disableClose: true
    });
  }

}

export class StudentsDataSource
  extends DataSource<StudentData> {

  constructor(private studentService: StudentService) {
    super();
  }

  connect(): Observable<StudentData[]> {
    return this.studentService.studentsSubject;
  }

  disconnect(): void {
  }


}
