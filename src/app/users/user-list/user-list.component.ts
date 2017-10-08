import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { UserData } from '../../dashboard/shared/user-data.model';
import { UserService } from '../shared/user.service';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, PageEvent } from '@angular/material';
import { UserDialogComponent } from '../../admin-panel/users/user-dialog/user-dialog.component';
import { UserCredentials } from '../../authentication/shared/user-credentials.model';
import { Page } from '../../shared/page.model';
import { Pagination } from '../../shared/pagination.model';
import { Subscription } from 'rxjs/Subscription';
import { Language } from 'angular-l10n';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../core/alert.service';
import { LoadingBarService } from '../../core/shared/loading-bar.service';
import { AuthenticationService } from '../../authentication/shared/authentication.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: UserData[];

  pagination: Pagination;

  usersDataSource: UsersDataSource;
  userChangeSubscription: Subscription;

  admin: boolean;

  @Language() lang: string;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private alertService: AlertService,
              private loadingBarService: LoadingBarService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.users = [];
    this.pagination = new Pagination();
    this.usersDataSource = new UsersDataSource(this.userService);

    const currentUser: UserCredentials = AuthenticationService.getCurrentUser();
    const currentUrl: string = this.route.snapshot.parent.url.join();

    console.log(currentUser);
    console.log(currentUrl);

    this.admin = this.isAdmin(currentUser, currentUrl);

    // FIXME this.fetchStudents(0, this.pagination.pageSize);
    this.getUsers();

    this.userChangeSubscription = this.userService.userChange.subscribe(() => this.getUsers());
  }


  ngOnDestroy() {
    if (this.userChangeSubscription) {
      this.userChangeSubscription.unsubscribe();
    }
  }

  onPageOptionsChange(page: PageEvent) {
    // FIXME this.fetchUsers(page.pageIndex, page.pageSize);
    console.log(page);
  }

  getUsers() {
    this.loadingBarService.start();

    this.userService.getAllUsers()
      .subscribe(
        (userPage: Page<UserData>) => {
          this.users = userPage.content;
          this.userService.usersSubject.next(this.users);

          this.pagination.length = userPage.totalElements;
          this.pagination.pageSize = userPage.size;

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

  onOpenUserDialog(editMode: boolean, userId?: number) {
    this.openStudentDialog(editMode, userId);
  }

  private openStudentDialog(editMode: boolean, userId?: number): MatDialogRef<UserDialogComponent> {
    return this.dialog.open(UserDialogComponent, {
      data: {
        title: editMode ? 'EditUserButtonText' : 'AddNewUserButtonText',
        editMode: editMode,
        userId: userId
      },
      disableClose: true
    });
  }

}

export class UsersDataSource extends DataSource<UserData> {

  constructor(private userService: UserService) {
    super();
  }

  connect(): Observable<UserData[]> {
    return this.userService.usersSubject;
  }

  disconnect(): void {
  }

}
