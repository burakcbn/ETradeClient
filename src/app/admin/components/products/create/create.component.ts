import { ListCategory } from 'src/app/contracts/category/list-category';
import { CategoryService } from './../../../../sevices/common/models/category.service';
import { FileUploadOptions } from './../../../../sevices/common/file-upload/file-upload.component';
import { AlertifyOptions } from './../../../../sevices/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from './../../../../sevices/common/product.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/create-product';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/sevices/admin/alertify.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(private productsService: ProductService,
    private ngxSpinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private categoryService: CategoryService) { super(ngxSpinner); }

  @Output() createdProduct: EventEmitter<string> = new EventEmitter();
  categories: ListCategory;


  async ngOnInit() {
    this.categories = await this.categoryService.getAllCategory();

  }





  create(productName: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement,categoryId:string) {
    this.show(SpinnerType.BallSpinClockwiseFadeRotating);
    const createProduct: CreateProduct = new CreateProduct();
    createProduct.categoryId=categoryId;
    createProduct.productName = productName.value;
    createProduct.stock = parseInt(stock.value);
    createProduct.price = parseFloat(price.value);

    

    this.productsService.create(createProduct, () => {
      this.hide(SpinnerType.BallSpinClockwiseFadeRotating);
      this.alertify.message("Urun eklendi", { messageType: MessageType.Success, dismissOthers: true, position: Position.Top_Right });
      this.createdProduct.emit(productName.value);
    }, (errorMessage) => {
      this.hide(SpinnerType.BallSpinClockwiseFadeRotating);
      this.alertify.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error
      });
    })
  }



}
