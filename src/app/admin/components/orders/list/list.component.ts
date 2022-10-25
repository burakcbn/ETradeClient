import { OrderDetailDialogComponent, OrderDetailDialogState } from './../../../../dialogs/order-detail-dialog/order-detail-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/list_product';
import { ListOrder } from 'src/app/contracts/order/list-order';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/sevices/admin/alertify.service';
import { DialogService } from 'src/app/sevices/common/dialog.service';
import { OrderService } from 'src/app/sevices/common/models/order.service';
import { ProductService } from 'src/app/sevices/common/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService,
    private orderService: OrderService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService) {
    super(spinner)
  }

  displayedColumns: string[] = ['orderCode', 'userName', 'totalPrice', 'createdDate','viewDetail','completed','delete'];
  dataSource: MatTableDataSource<ListOrder> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getOrders() {
    this.show(SpinnerType.BallAtom);
    const allOrders: { count: number; orders: ListOrder[] } = await this.orderService.getAllOrders(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hide(SpinnerType.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.Top_Right
    }))
    this.dataSource = new MatTableDataSource<ListOrder>(allOrders.orders);
    this.paginator.length = allOrders.count;
  }

  async pageChanged() {
    await this.getOrders();
  }

  async ngOnInit() {
    await this.getOrders();
  }
  showDetail(id:string,completed:boolean){
    this.dialogService.openDialog({
      componentType:OrderDetailDialogComponent,
      data:{id,completed},
      options:{witdh:"750px"},
      afterClosed:()=>{

      }
    })
  }
}
