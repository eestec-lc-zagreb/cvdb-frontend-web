import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule, MatPaginatorModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule, MatTableModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    MatExpansionModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    MatExpansionModule
  ]
})
export class MaterialDesignModule {
}
