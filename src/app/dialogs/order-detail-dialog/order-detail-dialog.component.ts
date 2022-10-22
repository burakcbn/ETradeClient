import { SingleOrder } from './../../contracts/order/single-order';
import { OrderService } from 'src/app/sevices/common/models/order.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})

export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    private orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string) { super(dialogRef); }

  singleOrder: SingleOrder;
  displayedColumns: string[] = ['name','price','quantity','totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice: number;

  async ngOnInit() {
    this.singleOrder = await this.orderService.getOrderById(this.data as string);
    this.dataSource=this.singleOrder.basketItems;
    this.totalPrice = this.singleOrder.basketItems.map((basketItem, index) => basketItem.price * basketItem.quantity).reduce((price, current) => price + current);
  }

}
export enum OrderDetailDialogState {
  Cancel, OrderComplete
}