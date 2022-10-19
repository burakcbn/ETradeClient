import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
declare var $:any;
@Component({
  selector: 'app-basket-item-remove-dialog',
  templateUrl: './basket-item-remove-dialog.component.html',
  styleUrls: ['./basket-item-remove-dialog.component.scss']
})
export class BasketItemRemoveDialogComponent extends BaseDialog<BasketItemRemoveDialogComponent> implements OnDestroy{

  constructor(dialogRef: MatDialogRef<BasketItemRemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:BasketItemDeleteDialogState,) {
    super(dialogRef);
  }
  ngOnDestroy(): void {
    $("#basketModal").modal("show");
  }

  ngOnInit(): void {
  }

}
export enum BasketItemDeleteDialogState{
  Yes="yes",
}
