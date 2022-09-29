import { FileUploadDialogComponent, FileUploadDialogState } from './../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageType } from 'src/app/sevices/admin/alertify.service';
import { AlertifyOptions, AlertifyService } from './../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './../../ui/custom-toastr.service';
import { HttpClientService } from './../http-client.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private httpClientService: HttpClientService,
    private customToastrService: CustomToastrService,
    private alertifyService: AlertifyService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) { }

  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>;
  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();

    for (const file of files) {

      const fileEntry = (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath)
      });
    }
    const message: string = "Yükleme işlemi başarı ile gerçekleştirildi";
    this.dialogService.openDialog({

      afterClosed: () => {
        this.httpClientService.post({
          action: this.options.action,
          controller: this.options.controller,
          headers: new HttpHeaders({ "responseType": "blob" }),
          queryString: this.options.queryString,
        }, fileData).subscribe(() => {
          if (this.options.isAdmin) {
            this.alertifyService.message(message, {
              dismissOthers: true,
              messageType: MessageType.Success
            })
          }
          else {
            this.customToastrService.message(message, "Başarılı", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight
            });
          }
        }, (errorMessage: HttpErrorResponse) => {
          if (this.options.isAdmin) {
            this.alertifyService.message(errorMessage.message, {
              dismissOthers: true,
              messageType: MessageType.Error
            })
          }
          else {
            this.customToastrService.message(errorMessage.message, "Başarısız", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight
            })
          }
        })
      },
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
    })


  }
  // openDialog(deleteMethod: () => void): void {
  //   const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //     width: '250px',
  //     data: FileUploadDialogState.Yes,
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == FileUploadDialogState.Yes) {
  //       deleteMethod();
  //     }
  //   });
  // }
}
export class FileUploadOptions {
  action?: string;
  controller?: string;
  explantion?: string;
  queryString?: string;
  isAdmin?: boolean;
  accept?: string;
}
