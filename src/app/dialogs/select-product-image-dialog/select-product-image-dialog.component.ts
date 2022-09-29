import { FileUploadOptions } from './../../sevices/common/file-upload/file-upload.component';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from './../base/base-dialog';
import { Component, Inject, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> {

  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string) {
    super(dialogRef);
  }
  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png , .jpeg, .jpg,.gif ",
    action: "upload",
    controller: "products",
    explantion:"Yüklemek istediiniz resmi seçiniz",
    isAdmin:true,
    queryString:`id=${this.data}`
    
  };
  
  ngOnInit(): void {
  }

}
export enum SelectProductImageState {
  Close
}
