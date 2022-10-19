import { AlertifyService, MessageType, Position } from './../../../sevices/admin/alertify.service';
import { HubUrls } from './../../../constants/hub-urls';
import { ReceiveFunctions } from './../../../constants/receive-functions';
import { SignalRService } from './../../../sevices/common/signalr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private signalRService: SignalRService,private alertifyService:AlertifyService) {
    super(spinner);
    // signalRService.start(HubUrls.ProductHub);
    // signalRService.start(HubUrls.OrderHub);
  }

  ngOnInit(): void {
    this.signalRService.on(HubUrls.ProductHub,ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      this.alertifyService.message(message,{
        messageType:MessageType.Notify,
        position:Position.Top_Right,
      })
    });
    
    this.signalRService.on(HubUrls.OrderHub,ReceiveFunctions.OrderAddedMessageReceiveFunction, message => {
      this.alertifyService.message(message,{
        messageType:MessageType.Notify,
        position:Position.Top_Right,
      })
    })

  }

}
