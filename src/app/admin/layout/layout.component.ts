import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from './../../sevices/admin/alertify.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends BaseComponent implements OnInit {

  constructor(private alertify:AlertifyService,spinner:NgxSpinnerService) { super(spinner);}

  ngOnInit(): void {
   // this.alertify.message("Merhaba",{delay:4,dismissOthers:true,messageType:MessageType.Success,position:Position.Top_Center});
    //this.show(SpinnerType.BallAtom);
    //this.alertify.dismissAll();
  }

}
