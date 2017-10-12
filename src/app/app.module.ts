import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from './shared/material-design.module';
import { DialogComponent } from './shared/dialog/dialog.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { AlertService } from './core/alert.service';
import { LocaleService, LocalizationModule, TranslationService } from 'angular-l10n';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationService } from './authentication/shared/authentication.service';
import { LoadingBarComponent } from './core/loading-bar/loading-bar.component';
import { LoadingBarService } from './core/shared/loading-bar.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationGuard } from './authentication/shared/authentication.guard';
import { HttpClient } from './core/shared/http-client.service';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { SidebarService } from './core/shared/sidebar.service';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { AccountComponent } from './dashboard/account/account.component';
import { SubscriptionsService } from './dashboard/shared/subscriptions.service';
import { ParticipantsComponent } from './events/participants/participants.component';
import { EventService } from './events/shared/event.service';
import { EventListComponent } from './events/event-list/event-list.component';
import { PasswordDialogComponent } from './dashboard/account/password-dialog/password-dialog.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UsersComponent } from './admin-panel/users/users.component';
import { StudentsComponent } from './admin-panel/students/students.component';
import { EventsComponent } from './admin-panel/events/events.component';
import { EventDialogComponent } from './admin-panel/events/event-dialog/event-dialog.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentService } from './students/shared/student.service';
import { StudentDialogComponent } from './admin-panel/students/student-dialog/student-dialog.component';
import { UserService } from './users/shared/user.service';
import { UserDialogComponent } from './admin-panel/users/user-dialog/user-dialog.component';
import { AddParticipantComponent } from './events/add-participant/add-participant.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    NavbarComponent,
    LoginComponent,
    LoadingBarComponent,
    DashboardComponent,
    OverviewComponent,
    SidebarComponent,
    AccountComponent,
    ParticipantsComponent,
    EventListComponent,
    PasswordDialogComponent,
    AdminPanelComponent,
    UsersComponent,
    StudentsComponent,
    EventsComponent,
    EventDialogComponent,
    UserListComponent,
    StudentListComponent,
    StudentDialogComponent,
    UserDialogComponent,
    AddParticipantComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    MaterialDesignModule,
    LocalizationModule.forRoot()
  ],
  providers: [
    HttpClient,
    AlertService,
    AuthenticationService,
    AuthenticationGuard,
    LoadingBarService,
    SidebarService,
    SubscriptionsService,
    EventService,
    UserService,
    StudentService
  ],
  entryComponents: [
    DialogComponent,
    PasswordDialogComponent,
    EventDialogComponent,
    StudentDialogComponent,
    UserDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(public locale: LocaleService, public translation: TranslationService) {
    this.locale.addConfiguration()
      .addLanguages(['en', 'hr'])
      .setCookieExpiration(30)
      .defineDefaultLocale('hr', 'HR')
      .defineCurrency('HRK');

    this.translation.addConfiguration()
      .addProvider('./assets/locales/locale-');

    this.translation.init();
  }
}
