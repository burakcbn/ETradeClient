import { CreateBasketItem } from './../../../contracts/basket/create-basket-item';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from 'src/app/sevices/common/http-client.service';
import { Injectable } from '@angular/core';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { UpdateBasketItem } from 'src/app/contracts/basket/update-basket-item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService: HttpClientService) { }

  async get(): Promise<ListBasketItem[]> {
    const observable: Observable<ListBasketItem[]> = this.httpClientService.get<ListBasketItem[]>({
      controller: "Baskets",
    });

    return await firstValueFrom(observable);
  }

  async add(product: CreateBasketItem): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "Baskets"
    }, product);
    await firstValueFrom(observable);
  }

  async put(basketItem: UpdateBasketItem): Promise<void> {
    const observable: Observable<any> = this.httpClientService.put({
      controller: "Baskets"
    }, basketItem);
    await firstValueFrom(observable);
  }

  async remove(basketItemId: string) :Promise<void> {
    const observable: Observable<any> = this.httpClientService.delete({
      controller: "Baskets"
    }, basketItemId);
    await firstValueFrom(observable); 
  }
}
