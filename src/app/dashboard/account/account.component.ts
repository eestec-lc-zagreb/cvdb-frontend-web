import { Component, OnInit } from '@angular/core';
import { Language } from 'angular-l10n';
import { AlertService } from '../../core/alert.service';
import { UserData } from '../shared/user-data.model';
import { AuthenticationService } from '../../authentication/shared/authentication.service';
import { LoadingBarService } from '../../core/shared/loading-bar.service';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UserService } from 'app/users/shared/user.service';

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
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.id = AuthenticationService.getCurrentUser().id;
    this.user = new UserData();

    this.loadingBarService.start();
    this.userService.getUser(this.id)
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
    this.userService.updateUser(this.user)
      .subscribe(
        (user: UserData) => {
          this.alertService.success('UserDataUpdateMessage');

          this.loadingBarService.stop();
        },
        error => {
          this.alertService.error(error);

          this.loadingBarService.stop();
        });
  }

  onOpenChangePasswordDialog() {
    this.openPasswordDialog();
  }
  private openPasswordDialog(): MatDialogRef<PasswordDialogComponent> {
    return this.dialog.open(PasswordDialogComponent, {
      data: {
        id: this.id,
        title: 'ChangePasswordText'
      },
      disableClose: true
    });
  }
}
