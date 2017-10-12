import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Language } from 'angular-l10n';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../../core/alert.service';
import { LoadingBarService } from '../../../core/shared/loading-bar.service';
import { UserService } from '../../../users/shared/user.service';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {

  @Language() lang: string;

  constructor(public dialogRef: MatDialogRef<PasswordDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService,
              private alertService: AlertService,
              private loadingBarService: LoadingBarService) { }

  ngOnInit() {
  }

  onChangePassword(form: NgForm) {
    const data = form.value;

    const oldPassword = data.oldPassword;
    const newPassword = data.oldPassword;
    const confirmPassword = data.confirmation;

    this.loadingBarService.start();

    this.userService.changePassword(this.data.id, oldPassword, newPassword, confirmPassword)
      .subscribe(
        response => {
          if (response.status === 204) {
            this.alertService.success('ChangePasswordSuccessMessage');

            this.dialogRef.close();
          } else {
            this.alertService.error('Something went wrong');
          }

          this.loadingBarService.stop();
        },
        error => {
          this.alertService.error(error);

          this.loadingBarService.stop();
        }
      );
  }

}
