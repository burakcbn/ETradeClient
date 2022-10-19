import { ShoppingCompleteDialogComponent, ShoppingCompleteState } from './../../../dialogs/shopping-complete-dialog/shopping-complete-dialog.component';
import { async } from 'rxjs';
import { BasketItemDeleteDialogState, BasketItemRemoveDialogComponent } from './../../../dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { Router } from '@angular/router';
import { OrderService } from './../../../sevices/common/models/order.service';
import { UpdateBasketItem } from 'src/app/contracts/basket/update-basket-item';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BasketService } from 'src/app/sevices/common/models/basket.service';
import { CreateOrder } from 'src/app/contracts/order/create-order';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/sevices/ui/custom-toastr.service';
import { DialogService } from 'src/app/sevices/common/dialog.service';

declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {


  constructor(spinner: NgxSpinnerService,
    private basketService: BasketService,
    private orderService: OrderService,
    private toastrService: CustomToastrService,
    private router: Router,
    private dialogService: DialogService) { super(spinner); }

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

  remove(basketItemId: string) {
    $("#basketModal").modal("hide");
    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      data: BasketItemDeleteDialogState.Yes,
      afterClosed: async () => {
        this.show(SpinnerType.BallAtom);
        await this.basketService.remove(basketItemId);
        $("." + basketItemId).fadeOut(500, () => this.hide(SpinnerType.BallAtom));
        $("#basketModal").modal("show");
      }
    })
  }

  shoppingComplete() {
    
    $("#basketModal").modal("hide");
    this.dialogService.openDialog({
      componentType: ShoppingCompleteDialogComponent,
      data: ShoppingCompleteState.Yes,
      afterClosed: async () => {
        this.show(SpinnerType.BallAtom);
        const order: CreateOrder = new CreateOrder();
        order.address = "Mahalle";
        order.description = "Açıklama";
        await this.orderService.create(order);
        this.hide(SpinnerType.BallAtom);
        this.toastrService.message("Sipariş alındı", "Sipariş oluşturuldu", {
          messageType: ToastrMessageType.Info,
          position: ToastrPosition.TopRight
        })
        this.router.navigate["/"];
      }
    })

  }

}
