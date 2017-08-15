import { TestBed, inject } from '@angular/core/testing';

import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { MaterialDesignModule } from '../shared/material-design.module';

describe('AlertService', () => {
  const mockRouter = {
    rootComponentType: '',
    events: {
      subscribe() {}
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialDesignModule
      ],
      providers: [
        AlertService,
        {provide: Router, useValue: mockRouter}]
    });
  });

  it('should be created', inject([AlertService], (service: AlertService) => {
    expect(service).toBeTruthy();
  }));
});
