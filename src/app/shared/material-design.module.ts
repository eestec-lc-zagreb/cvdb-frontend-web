import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule, MdChipsModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdSelectModule,
  MdSidenavModule,
  MdSnackBarModule, MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk';

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
    MdButtonToggleModule,
    MdCardModule,
    MdChipsModule,
    MdTableModule,
    CdkTableModule
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
    MdButtonToggleModule,
    MdCardModule,
    MdChipsModule,
    MdTableModule,
    CdkTableModule
  ]
})
export class MaterialDesignModule {
}
