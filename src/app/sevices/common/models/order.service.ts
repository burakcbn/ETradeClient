import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { CreateOrder } from 'src/app/contracts/order/create-order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService: HttpClientService) { }

  async create(createOrder: CreateOrder):Promise<void> {

    const observable: Observable<any> = await this.httpClientService.post({
      controller: "Orders"
    }, createOrder);

    firstValueFrom(observable);
  }
}
