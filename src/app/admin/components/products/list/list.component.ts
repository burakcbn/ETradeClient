import { SelectProductImageDialogComponent } from './../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { DialogService } from './../../../../sevices/common/dialog.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../../base/base.component';
import { AlertifyService, MessageType } from 'src/app/sevices/admin/alertify.service';
import { ListProduct } from './../../../../contracts/list_product';
import { ProductService } from './../../../../sevices/common/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { delay } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { QrcodeDialogComponent } from 'src/app/dialogs/qrcode-dialog/qrcode-dialog.component';
declare var $: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['productName', 'stock', 'price', 'createdDate', 'updateDate', 'photos', 'qrcode', 'edit', 'delete'];
  dataSource: MatTableDataSource<ListProduct> = (null);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productService: ProductService,
    private alertifyService: AlertifyService,
    ngxSpinner: NgxSpinnerService,
    private dialogService: DialogService
  ) { super(ngxSpinner) }

  async getProducts() {
    this.show(SpinnerType.BallSpinClockwiseFadeRotating);

    const allProducts: { count: number, products: ListProduct[] } = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
      () => { this.hide(SpinnerType.BallSpinClockwiseFadeRotating) },
      (errorMessage) => {
        this.alertifyService.message(errorMessage, {
          dismissOthers: true,
          messageType: MessageType.Error
        })
      }
    )

    this.dataSource = new MatTableDataSource<ListProduct>(allProducts.products);
    this.paginator.length = allProducts.count;
  }
  async pageChanged() {
    await this.getProducts();
  }
  addProductImages(id: string) {
    this.dialogService.openDialog({
      componentType: SelectProductImageDialogComponent,
      data: id,
      options: {
        witdh: "1400 px",
      }
    })
  }

  showQRCode(productId: string) {
    this.show(SpinnerType.BallAtom);
    this.dialogService.openDialog({
      componentType: QrcodeDialogComponent,
      data: productId,
    })
    this.hide(SpinnerType.BallAtom);
  }
  // delete(id, event) {
  //   const element: HTMLImageElement = event.srcElement;
  //   console.log(id);
  //   console.log(element.parentElement.parentElement);
  //   $(element.parentElement.parentElement).fadeOut(1000)
  //(click)="delete(element.id,$event)
  // <img src="../../../../../assets/delete.png" width="25" height="25" >s
  // }

  async ngOnInit() {
    await this.getProducts();

  }

}
