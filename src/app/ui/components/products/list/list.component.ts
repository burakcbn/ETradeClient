import { ToastrService } from 'ngx-toastr';
import { CreateBasketItem } from './../../../../contracts/basket/create-basket-item';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/list_product';
import { BasketService } from 'src/app/sevices/common/models/basket.service';
import { ProductService } from 'src/app/sevices/common/product.service';
import { async } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/sevices/ui/custom-toastr.service';
import { MessageType } from '@microsoft/signalr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private basketService: BasketService,
    private toastrService: CustomToastrService) { super(spinner); }

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  pageList: number[] = [];
  products: ListProduct[];

  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);
      const data: { count: number, products: ListProduct[] } = await this.productService.read(this.currentPageNo - 1, this.pageSize,
        () => {

        },
        errorMessage => {

        })

      this.products = data.products;
      this.totalProductCount = data.count;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      this.pageList = [];

      if (this.currentPageNo - 3 <= 0)
        for (let i = 1; i <= 7; i++) {
          this.pageList.push(i);
        }

      else if (this.currentPageNo + 3 >= this.totalPageCount)
        for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++) {
          this.pageList.push(i);
        }
      else
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++) {
          this.pageList.push(i);
        }
    })
  }

  async addToBasketItem(product: ListProduct) {
    this.show(SpinnerType.BallAtom);
    let _basketItem: CreateBasketItem = new CreateBasketItem();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem);
    this.hide(SpinnerType.BallAtom);
    this.toastrService.message("Ürün eklendi", "Başarıyla eklendi", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    });
  }
}
