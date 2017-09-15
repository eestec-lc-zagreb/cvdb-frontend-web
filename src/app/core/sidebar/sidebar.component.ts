import { Component, OnInit } from '@angular/core';
import { Language } from 'angular-l10n';
import { AuthenticationService } from '../../authentication/shared/authentication.service';
import { UserCredentials } from '../../authentication/shared/user-credentials.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUser: UserCredentials;

  @Language() lang: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.currentUser = AuthenticationService.getCurrentUser();
  }

  onLogout() {
    this.authenticationService.logout();
  }

}
