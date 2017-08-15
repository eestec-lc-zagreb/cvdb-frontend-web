import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AlertService } from '../alert.service';
import { MdButtonToggleChange } from '@angular/material';
import { Language, LocaleService } from 'angular-l10n';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: any;

  userLoggedInSubscription: Subscription;

  @Language() lang: string;

  constructor(private alertService: AlertService, private locale: LocaleService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.userLoggedInSubscription) {
      this.userLoggedInSubscription.unsubscribe();
    }
  }

  onLogout() {
  }

  onLocaleChange(event: MdButtonToggleChange) {
    this.locale.setCurrentLanguage(event.value);
  }

}
