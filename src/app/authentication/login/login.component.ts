import { Component, OnInit } from '@angular/core';
import { Language } from 'angular-l10n';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Language() lang: string;

  constructor() { }

  ngOnInit() {
  }

  login() {
    console.log('Login submitted');
  }

}
