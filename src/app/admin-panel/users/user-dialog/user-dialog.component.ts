import { Component, Inject, OnInit } from '@angular/core';
import { UserData } from '../../../dashboard/shared/user-data.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LoadingBarService } from '../../../core/shared/loading-bar.service';
import { AlertService } from '../../../core/alert.service';
import { UserService } from '../../../users/shared/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  user: UserData;

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private loadingBarService: LoadingBarService,
              private alertService: AlertService,
              private userService: UserService) { }

  ngOnInit() {
    this.user = new UserData();

    if (this.data.editMode) {
      this.getUserData();
    }
  }

  onSubmitUserData() {
    this.loadingBarService.start();

    let userDataObservable: Observable<UserData>;

    if (this.data.editMode) {
      userDataObservable = this.userService.updateUser(this.user);
    } else {
      userDataObservable = this.userService.createUser(this.user);
    }

    userDataObservable.subscribe(
      (userData: UserData) => {
        this.userService.userChange.next(userData);

        let eventMessage;
        if (this.data.editMode) {
          eventMessage = 'User updated';
        } else {
          eventMessage = 'User created';
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

  getUserData() {
    this.userService.getUser(this.data.userId)
      .subscribe(
        (user: UserData) => {
          this.user = user;

        },
        error => {
          this.alertService.error(error);

        }
      );
  }

}
