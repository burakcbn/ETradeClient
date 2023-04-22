import { ProductService } from 'src/app/sevices/common/product.service';
import { Component, OnInit, Inject, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode/public-api';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-qrcode-reading-dialog',
  templateUrl: './qrcode-reading-dialog.component.html',
})
export class QrcodeReadingDialogComponent extends BaseDialog<QrcodeReadingDialogComponent> implements OnInit, OnDestroy {


  constructor(dialogRef: MatDialogRef<QrcodeReadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngxSpinner: NgxSpinnerService,
    private productService: ProductService) { super(dialogRef); }


  @ViewChild("scanner", { static: true }) scanner: NgxScannerQrcodeComponent;
  @ViewChild("txtStock", { static: true }) txtStock: ElementRef;

  ngOnInit(): void {
    this.scanner.start();
  }
  ngOnDestroy(): void {
    this.scanner.stop();
  }
  onEvent(e) {
    const data = (e as { data: string }).data;

    if (data) {
      const jsonData = JSON.parse(data);
      const stockValue = parseInt((this.txtStock.nativeElement as HTMLInputElement).value);
      this.productService.updateQRCode(jsonData.Id, stockValue);
    }

  }

}
