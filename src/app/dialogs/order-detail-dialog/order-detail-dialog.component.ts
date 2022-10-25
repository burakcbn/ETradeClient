import { AlertifyService, MessageType, Position } from './../../sevices/admin/alertify.service';
import { async } from 'rxjs';
import { CompleteOrderDialogComponent, CompleteOrderDialogState } from './../complete-order-dialog/complete-order-dialog.component';
import { DialogService } from './../../sevices/common/dialog.service';
import { SingleOrder } from './../../contracts/order/single-order';
import { OrderService } from 'src/app/sevices/common/models/order.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BaseDialog } from '../base/base-dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})

export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    private orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | any,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService,
    private alertifyService:AlertifyService) { super(dialogRef); }

  singleOrder: SingleOrder;
  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice: number;

  async ngOnInit() {
    this.singleOrder = await this.orderService.getOrderById(this.data.id as string);
    this.dataSource = this.singleOrder.basketItems;
    this.totalPrice = this.singleOrder.basketItems.map((basketItem, index) => basketItem.price * basketItem.quantity).reduce((price, current) => price + current);
  }
  completeOrder() {
    this.dialogService.openDialog({
      componentType: CompleteOrderDialogComponent,
      data: CompleteOrderDialogState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallAtom);
        await this.orderService.completeOrder(this.data.id as string,
          ()=>{
            this.spinner.hide(SpinnerType.BallAtom),
              this.alertifyService.message("Sipariş oluşturuldu... Kullanıcı bilgilendirildi",{
                messageType:MessageType.Success,
                position:Position.Top_Right
              })
          },);
        
      }
    })
  }

}
export enum OrderDetailDialogState {
  Cancel, OrderComplete
}