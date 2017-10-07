import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AlertService } from '../alert.service';
import { MatButtonToggleChange } from '@angular/material';
import { Language, LocaleService } from 'angular-l10n';
import { SidebarService } from '../shared/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: any;

  userLoggedInSubscription: Subscription;

  @Language() lang: string;

  constructor(private sidebarService: SidebarService, private locale: LocaleService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.userLoggedInSubscription) {
      this.userLoggedInSubscription.unsubscribe();
    }
  }

  onToggle() {
    this.sidebarService.toggleMenu();
  }

  onLogout() {
  }

  setLocale(locale: string) {
    if (locale === 'hr' || locale === 'en') {
      this.locale.setCurrentLanguage(locale);
    }
  }

}
