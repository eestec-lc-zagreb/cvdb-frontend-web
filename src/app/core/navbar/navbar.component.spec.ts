import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { MaterialDesignModule } from '../../shared/material-design.module';
import { Http, HttpModule } from '@angular/http';
import { Router, RouterModule } from '@angular/router';
import { AlertService } from '../alert.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  const mockRouter = {
    navigate() {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterModule,
        MaterialDesignModule
      ],
      declarations: [ NavbarComponent ],
      providers: [
        AlertService,
        {provide: Router, useValue: mockRouter}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
