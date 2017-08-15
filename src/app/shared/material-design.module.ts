import {
  MdButtonModule, MdButtonToggleModule,
  MdCheckboxModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdSelectModule,
  MdSidenavModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MdButtonModule,
    MdCheckboxModule,
    MdMenuModule,
    MdButtonModule,
    MdToolbarModule,
    MdInputModule,
    MdProgressBarModule,
    MdSnackBarModule,
    MdIconModule,
    MdSidenavModule,
    MdListModule,
    MdTabsModule,
    MdSelectModule,
    MdTooltipModule,
    MdDialogModule,
    MdButtonToggleModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdMenuModule,
    MdButtonModule,
    MdToolbarModule,
    MdInputModule,
    MdProgressBarModule,
    MdSnackBarModule,
    MdIconModule,
    MdSidenavModule,
    MdListModule,
    MdTabsModule,
    MdSelectModule,
    MdTooltipModule,
    MdDialogModule,
    MdButtonToggleModule
  ]
})
export class MaterialDesignModule {
}
