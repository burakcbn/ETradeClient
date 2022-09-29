import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(dialogPatameters: Partial<DialogParameters>): void {
    const dialogRef = this.dialog.open(dialogPatameters.componentType, {
      width: dialogPatameters.options?.witdh,
      height: dialogPatameters.options?.height,
      position: dialogPatameters.options?.position,
      data: dialogPatameters.data,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == dialogPatameters.data) {
        dialogPatameters.afterClosed();
      }
    });
  }
}
export class DialogParameters {
  componentType: ComponentType<any>;
  data: any;
  afterClosed: () => void;
  options?: Partial<DialogOptions>=new DialogOptions();
}
export class DialogOptions {
  witdh?: string = "250px";
  height?: string;
  position?: DialogPosition
}