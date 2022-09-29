import { FileUploadModule } from './../sevices/common/file-upload/file-upload.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';



@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductImageDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,FileUploadModule
  ]
})
export class DialogModule { }
