import { UpdateBasketItem } from 'src/app/contracts/basket/update-basket-item';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BasketService } from 'src/app/sevices/common/models/basket.service';

declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {


  constructor(spinner: NgxSpinnerService, private basketService: BasketService) { super(spinner); }

  basketItems: ListBasketItem[];
  async ngOnInit() {
    this.show(SpinnerType.BallAtom);
    this.basketItems = await this.basketService.get();
    this.hide(SpinnerType.BallAtom);
  }

  async changeQuantity(object: any) {
    this.show(SpinnerType.BallAtom);
    const basketItemId: string = object.target.attributes["id"].value;
    const quantity: number = object.target.value;

    const basketItem: UpdateBasketItem = new UpdateBasketItem();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hide(SpinnerType.BallAtom);
  }

  async remove(basketItemId: string) {
    this.show(SpinnerType.BallAtom);
    await this.basketService.remove(basketItemId);
    $("." + basketItemId).fadeOut(500, () => this.hide(SpinnerType.BallAtom));
  }

}
