import { Component, Inject, OnInit } from '@angular/core';
import { StudentData } from '../../../students/shared/student-data.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LoadingBarService } from '../../../core/shared/loading-bar.service';
import { AlertService } from '../../../core/alert.service';
import { StudentService } from '../../../students/shared/student.service';
import { Observable } from 'rxjs/Observable';
import { STUDY_PROGRAMMES } from '../../../shared/app.constants';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss']
})
export class StudentDialogComponent implements OnInit {

  student: StudentData;

  studyProgrammes: string[];

  constructor(public dialogRef: MatDialogRef<StudentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private loadingBarService: LoadingBarService,
              private alertService: AlertService,
              private studentService: StudentService) { }

  ngOnInit() {
    this.student = new StudentData();
    this.studyProgrammes = STUDY_PROGRAMMES;

    if (this.data.editMode) {
      this.getStudentData();
    }
  }

  onSubmitStudentData() {
    this.loadingBarService.start();

    let studentDataObservable: Observable<StudentData>;

    if (this.data.editMode) {
      studentDataObservable = this.studentService.updateStudent(this.student);
    } else {
      studentDataObservable = this.studentService.createStudent(this.student);
    }

    studentDataObservable.subscribe(
      (studentData: StudentData) => {
        this.studentService.studentChange.next(studentData);

        let eventMessage;
        if (this.data.editMode) {
          eventMessage = 'Student updated';
        } else {
          eventMessage = 'Student created';
        }

        this.alertService.success(eventMessage);
        this.loadingBarService.stop();

        this.dialogRef.close();
      },
      error => {
        console.error(error);

        this.alertService.error(error);
        this.loadingBarService.stop();

        this.dialogRef.close();
      }
    );
  }

  getStudentData() {
    this.studentService.getStudent(this.data.studentId)
      .subscribe(
        (student: StudentData) => {
          this.student = student;

        },
        error => {
          this.alertService.error(error);

        }
      );
  }

}
