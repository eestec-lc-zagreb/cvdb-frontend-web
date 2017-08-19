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

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    NavbarComponent,
    LoginComponent,
    LoadingBarComponent,
    DashboardComponent,
    OverviewComponent,
    SidebarComponent
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
    SidebarService
  ],
  entryComponents: [
    DialogComponent
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
