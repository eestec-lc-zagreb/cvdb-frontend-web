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
        label: 'Users',
        navLink: '/dashboard/admin/users'
      },
      {
        id: 'students',
        label: 'Students',
        navLink: '/dashboard/admin/students'
      },
      {
        id: 'events',
        label: 'Events',
        navLink: '/dashboard/admin/events'
      }
    ];
  }

}
