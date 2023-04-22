import { QrcodeReadingDialogComponent } from './../../../dialogs/qrcode-reading-dialog/qrcode-reading-dialog.component';
import { DialogService } from './../../../sevices/common/dialog.service';
import { ListComponent } from './list/list.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { HttpClientService, RequestParameters } from 'src/app/sevices/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {


  constructor(
    spinner: NgxSpinnerService,
    private dialogService: DialogService) { super(spinner); }

  @ViewChild(ListComponent) listComponent: ListComponent;
  createdProduct(value: string) {
    this.listComponent.getProducts();
  }
  ngOnInit(): void {

  }
  showProductQrCodeReading() {
    this.dialogService.openDialog({
      componentType: QrcodeReadingDialogComponent,
      data: null,
      options:{
        height:"700px",
        witdh:"1000px"
      }
    })
  }
}
