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

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    NavbarComponent,
    LoginComponent
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
    AlertService,
    AuthenticationService
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
