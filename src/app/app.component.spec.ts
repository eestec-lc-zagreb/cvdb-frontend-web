import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { AuthenticationService } from './authentication/shared/authentication.service';
import { HttpModule } from '@angular/http';
import { AlertService } from './core/alert.service';
import { NavbarComponent } from './core/navbar/navbar.component';
import { MaterialDesignModule } from './shared/material-design.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule,
        MaterialDesignModule
      ],
      providers: [
        AuthenticationService,
        AlertService
      ],
      declarations: [
        AppComponent,
        NavbarComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
