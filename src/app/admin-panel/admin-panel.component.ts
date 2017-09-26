import { Component, OnInit } from '@angular/core';
import { Language } from 'angular-l10n';

@Component({
  selector: 'app-admin',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  @Language() lang: string;

  navLinks: {id: string, label: string, navLink: string}[];

  constructor() { }

  ngOnInit() {
    this.navLinks = [
      {
        id: 'users',
        label: 'UsersTabText',
        navLink: '/dashboard/admin/users'
      },
      {
        id: 'students',
        label: 'StudentsTabText',
        navLink: '/dashboard/admin/students'
      },
      {
        id: 'events',
        label: 'EventsTabText',
        navLink: '/dashboard/admin/events'
      }
    ];
  }

}
