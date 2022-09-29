import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr: ToastrService) { }
  message(message: string, title: string, options:Partial<ToastrOptions>) {
    this.toastr[options.messageType!](message, title,{positionClass:options.position});
  }
}
export class ToastrOptions{
  messageType:ToastrMessageType=ToastrMessageType.Info;
  position:ToastrPosition=ToastrPosition.BottomFullWidth;
}
export enum ToastrMessageType {
  Error = "error",
  Success = "success",
  Warning = "warning",
  Info = "info"
}
export enum ToastrPosition {
  TopRight = 'toast-top-right',
  BottomRight = 'toast-bottom-right',
  BottomLeft = 'toast-bottom-left',
  TopLeft = 'toast-top-left',
  TopFullWidth = 'toast-top-full-width',
  BottomFullWidth = 'toast-bottom-full-width',
  TopCenter = 'toast-top-center',
  BottomCenter = 'toast-bottom-center'
}