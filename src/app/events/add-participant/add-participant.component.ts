import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoadingBarService } from '../../core/shared/loading-bar.service';
import { StudentService } from '../../students/shared/student.service';
import { Page } from '../../shared/page.model';
import { StudentData } from '../../students/shared/student-data.model';
import { AlertService } from '../../core/alert.service';
import { MatSelectChange } from '@angular/material/select';
import { Language } from 'angular-l10n';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.scss']
})
export class AddParticipantComponent implements OnInit {

  @Language() lang: string;

  addParticipantMode: boolean;

  students: StudentData[];

  currentParticipantId: number;
  fileList: FileList;

  @Output()
  newParticipant: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private loadingBarService: LoadingBarService,
              private studentService: StudentService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.addParticipantMode = false;
    this.students = [];
  }

  onAddNewParticipant() {
    this.addParticipantMode = true;

    this.getStudents();
  }

  getStudents(): void {
    this.loadingBarService.start();

    this.studentService.getAllStudents()
      .subscribe(
        (studentDataPage: Page<StudentData>) => {
          this.students = studentDataPage.content;

          this.loadingBarService.stop();
        },
        error => {
          this.loadingBarService.stop();

          this.alertService.error(error);
        }
      );
  }

  onSubmit() {
    console.log('Submitted:');
    console.log(this.currentParticipantId);
    console.log(this.fileList);

    this.newParticipant.emit(true);
  }

  onParticipantChange(event: MatSelectChange) {
    this.currentParticipantId = event.value;
  }

  fileChange(event) {
    this.fileList = event.target.files;
  }

}
