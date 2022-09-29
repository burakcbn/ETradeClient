import { Injectable } from '@angular/core';
declare var alertify: any
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
//,content:number
  constructor() { }
  message(message: string, options: Partial<AlertifyOptions>) {
    alertify.set('notifier', 'delay', options.delay);
    alertify.set('notifier', 'position', options.position);
    const result = alertify[options.messageType!](message);
    if (options.dismissOthers)
      result.dismissOthers();
  }
  dismissAll() {
    alertify.dismissAll();
  }
}
export class AlertifyOptions {
  messageType: MessageType = MessageType.Success;
  position: Position = Position.Bottom_Left;
  delay: number = 3;
  dismissOthers: boolean = false;
}
export enum MessageType {
  Error = "error",
  Success = "success",
  Message = "message",
  Notify = "notify",
  Warning = "warning"
}
export enum Position {
  Bottom_Left = "bottom-left",
  Bottom_Right = "bottom-right",
  Bottom_Center = "bottom-center",
  Top_Right = "top-right",
  Top_Left = "top-left",
  Top_Center = "top-center"
}