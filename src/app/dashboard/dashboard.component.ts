import { AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SidebarService } from '../core/shared/sidebar.service';
import { Subscription } from 'rxjs/Subscription';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {

  @ViewChild('sidenav') sidenav: MdSidenav;

  menuToggleSubscription: Subscription;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.menuToggleSubscription = this.sidebarService.toggleSubject.subscribe(
      (value: boolean) => {
        this.sidenav.toggle();
      }
    );
  }

  ngAfterContentInit() {
    if (!this.sidenav.opened) {
      this.sidenav.open();
    }
  }

  ngOnDestroy() {
    if (this.menuToggleSubscription) {
      this.menuToggleSubscription.unsubscribe();
    }
  }

}
