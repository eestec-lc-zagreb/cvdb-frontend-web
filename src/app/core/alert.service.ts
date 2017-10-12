import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslationService } from 'angular-l10n';

@Injectable()
export class AlertService {

  constructor(private snackBar: MatSnackBar, private translationService: TranslationService) {
  }

  success(message: string) {
    const translatedMessage = this.translationService.translate(message);
    this.snackBar.open(translatedMessage, 'Close', {
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

