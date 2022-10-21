import { ListOrder } from './../../../contracts/order/list-order';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { CreateOrder } from 'src/app/contracts/order/create-order';
import { SingleOrder } from 'src/app/contracts/order/single-order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService: HttpClientService) { }

  async create(createOrder: CreateOrder): Promise<void> {

    const observable: Observable<any> = await this.httpClientService.post({
      controller: "Orders"
    }, createOrder);

    firstValueFrom(observable);
  }

  async getAllOrders(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ count: number; orders: ListOrder[] }> {
    const observable: Observable<{ count: number; orders: ListOrder[] }> = this.httpClientService.get({
      controller: "Orders",
      queryString: `page=${page}&size=${size}`
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error));

    return await promiseData;
  }
  async getOrderById(id:string,successCallBack?:()=>void,errorCallBack?:(error:string)=>void):Promise<SingleOrder> {
    const observable: Observable<SingleOrder> = this.httpClientService.get<SingleOrder>({
      controller: "Orders",
    },id);

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error));

    return await promiseData;
  }
}
