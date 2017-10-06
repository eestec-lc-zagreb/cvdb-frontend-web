import { Component, OnInit } from '@angular/core';
import { Language } from 'angular-l10n';
import { UserService } from '../shared/user.service';
import { AlertService } from '../../core/alert.service';
import { UserData } from '../shared/user-data.model';
import { AuthenticationService } from '../../authentication/shared/authentication.service';
import { LoadingBarService } from '../../core/shared/loading-bar.service';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  id: number;
  user: UserData;

  @Language() lang: string;

  constructor(private userService: UserService,
              private alertService: AlertService,
              private loadingBarService: LoadingBarService,
              public dialog: MdDialog) {
  }

  ngOnInit() {
    this.id = AuthenticationService.getCurrentUser().id;
    this.user = new UserData();

    this.loadingBarService.start();
    this.userService.getUserDetails(this.id)
      .subscribe(
        (userData: UserData) => {
          this.user = userData;

          this.loadingBarService.stop();
        },
        error => {
          this.alertService.error(error);

          this.loadingBarService.stop();
        }
      );
  }

  onSubmitChanges() {
    this.loadingBarService.start();
    this.userService.updateUserData(this.id, this.user.name)
      .subscribe(
        response => {
          if (response.status === 200) {
            this.alertService.success('User data updated');

            this.loadingBarService.stop();
          } else {
            this.alertService.error(response.json());

            this.loadingBarService.stop();
          }
        },
        error => {
          this.alertService.error(error);
        }
      );
  }

  onOpenChangePasswordDialog() {
    this.openPasswordDialog();
  }

  private openPasswordDialog(): MdDialogRef<PasswordDialogComponent> {
    return this.dialog.open(PasswordDialogComponent, {
      data: {
        id: this.id,
        title: 'ChangePasswordText'
      },
      disableClose: true
    });
  }
}
