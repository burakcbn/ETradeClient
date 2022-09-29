import { FileUploadOptions } from './../../../../sevices/common/file-upload/file-upload.component';
import { AlertifyOptions } from './../../../../sevices/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from './../../../../sevices/common/product.service';
import { Component, OnInit, Output } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/create-product';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/sevices/admin/alertify.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(private productsService: ProductService, private ngxSpinner: NgxSpinnerService, private alertify: AlertifyService) { super(ngxSpinner); }

  ngOnInit(): void {
  }
  create(stock: HTMLInputElement, price: HTMLInputElement) {
    this.show(SpinnerType.BallSpinClockwiseFadeRotating);
    const createProduct: CreateProduct = new CreateProduct();
    createProduct.stock = parseInt(stock.value);
    createProduct.price = parseFloat(price.value);

    this.productsService.create(createProduct, () => {
      this.hide(SpinnerType.BallSpinClockwiseFadeRotating);
      this.alertify.message("Urun eklendi", { messageType: MessageType.Success, dismissOthers: true, position: Position.Top_Right });
    }, (errorMessage) => {
      this.alertify.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error
      });
    })
  }
}
