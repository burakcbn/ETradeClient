import { DeleteDialogComponent, DeleteDialogState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType } from './../../sevices/admin/alertify.service';
import { HttpClientService } from 'src/app/sevices/common/http-client.service';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/sevices/common/dialog.service';
declare var $: any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    public dialog: MatDialog,
    private dialogService:DialogService
  ) {
    const image = _renderer.createElement("img");
    image.setAttribute("src", "../../../../../assets/delete.png");
    image.setAttribute("style", "cursor:pointer")
    image.width = "25"
    image.height = "25"
    _renderer.appendChild(element.nativeElement, image);
  }



  @Input() id: string;
  @Input() controller: string;
  @Output() callBack: EventEmitter<any> = new EventEmitter();



  @HostListener("click")
  async onClick() {
    this.dialogService.openDialog({
      afterClosed:async () => {
        const td: HTMLTableCellElement = this.element.nativeElement;
        this.httpClientService.delete({
          controller: this.controller
        }, this.id).subscribe(() => {
          $(td.parentElement).animate({
            opacity: 0,
            left: "+=50",
            height: "toogle",
          }, 500, () => {
            this.callBack.emit();
            this.alertifyService.message("Silme işlemi gerçekleştirildi",{messageType:MessageType.Success});
          })
        })
      },
      componentType:DeleteDialogComponent,
      data:DeleteDialogState.Yes
    });
  }


  // openDialog(deleteMethod: () => void): void {
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     width: '250px',
  //     data: DeleteResult.Yes,
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == DeleteResult.Yes) {
  //       deleteMethod();
  //     }
  // //   });
  // }

}
