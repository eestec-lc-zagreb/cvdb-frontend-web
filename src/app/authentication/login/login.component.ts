import { Component, OnInit } from '@angular/core';
import { Language } from 'angular-l10n';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';
import { UserCredentials } from '../shared/user-credentials.model';
import { AlertService } from '../../core/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Language() lang: string;

  constructor(private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private router: Router) {
  }

  ngOnInit() {
  }

  login(loginForm: NgForm) {
    console.log('Login submitted');

    const username = loginForm.value.username;
    const password = loginForm.value.password;

    this.authenticationService.login(username, password)
      .subscribe(
        (user: UserCredentials) => {
          this.alertService.success('You are successfully logged in')
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.log(error);
          this.alertService.error(error);
        }
      );
  }

}
