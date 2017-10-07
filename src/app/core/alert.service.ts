import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AlertService {

  constructor(private snackBar: MatSnackBar) {
  }

  success(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  error(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      extraClasses: ['snackbar-error']
    });
  }
}

