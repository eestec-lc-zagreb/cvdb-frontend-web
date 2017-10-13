import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationGuard } from './authentication/shared/authentication.guard';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { AccountComponent } from './dashboard/account/account.component';
import { ParticipantsComponent } from './events/participants/participants.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UsersComponent } from './admin-panel/users/users.component';
import { StudentsComponent } from './admin-panel/students/students.component';
import { EventsComponent } from './admin-panel/events/events.component';
import { SubscriptionsComponent } from './admin-panel/subscriptions/subscriptions.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard], children: [
    {path: 'overview', component: OverviewComponent},
    {path: 'events', component: EventListComponent},
    {path: 'events/:id/participants', component: ParticipantsComponent},
    {path: 'account', component: AccountComponent},
    {path: 'admin', component: AdminPanelComponent, children: [
      {path: 'users', component: UsersComponent},
      {path: 'students', component: StudentsComponent},
      {path: 'events', component: EventsComponent},
      {path: 'subscriptions', component: SubscriptionsComponent}
    ]}
  ]},
  {path: '**', redirectTo: '/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
