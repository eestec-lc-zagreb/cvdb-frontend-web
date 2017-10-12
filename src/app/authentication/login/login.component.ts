import { Component, OnInit } from '@angular/core';
import { Language } from 'angular-l10n';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';
import { UserCredentials } from '../shared/user-credentials.model';
import { AlertService } from '../../core/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingBarService } from '../../core/shared/loading-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Language() lang: string;

  returnUrl: string;

  constructor(private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private loadingBarService: LoadingBarService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(loginForm: NgForm) {
    const username = loginForm.value.username;
    const password = loginForm.value.password;

    this.loadingBarService.start();

    this.authenticationService.login(username, password)
      .subscribe(
        (user: UserCredentials) => {
          console.log('You are successfully logged in as: ' + JSON.stringify(user));
          this.loadingBarService.stop();

          this.alertService.success('LoginSuccessMessage');
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loadingBarService.stop();

          console.log(error);
          this.alertService.error(error);
        }
      );
  }

}
