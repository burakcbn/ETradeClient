import { SpinnerType } from './../../base/base.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { QrCodeService } from 'src/app/sevices/common/qr-code.service';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrls: ['./qrcode-dialog.component.scss']
})
export class QrcodeDialogComponent extends BaseDialog<QrcodeDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<QrcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private qrCodeService: QrCodeService,
    private domSanitizer: DomSanitizer,
    private ngxSpinner:NgxSpinnerService) { super(dialogRef); }

  qrCodeSafeUrl: SafeUrl;
  async ngOnInit() {
    this.ngxSpinner.show(SpinnerType.BallScaleMultiple);
    const qrCodeBlob: Blob = await this.qrCodeService.generateQRCode(this.data);
    const url: string = URL.createObjectURL(qrCodeBlob);
    this.qrCodeSafeUrl = this.domSanitizer.bypassSecurityTrustUrl(url);
    this.ngxSpinner.hide(SpinnerType.BallScaleMultiple);
  }

}
