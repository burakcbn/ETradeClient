import { firstValueFrom, Observable } from 'rxjs';
import { ListProduct } from './../../contracts/list_product';
import { HttpClientService } from 'src/app/sevices/common/http-client.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateProduct } from 'src/app/contracts/create-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(createProduct: CreateProduct, successCallBack?: any, errorCallBack?: (message: string) => void) {
    this.httpClientService.post({ controller: "products" }, createProduct).subscribe(() => {
      successCallBack();
    }, (error: HttpErrorResponse) => {
      let message: string = "";
      let _error: Array<{ key: string, value: Array<string> }> = error.error;
      _error.forEach((_v, index) => {
        _v.value.forEach((_e, _index) => {
          message += `${_e}<br>`;
        })
      })
      if (errorCallBack)
        errorCallBack(message);
    });
  }
  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ count: number, products: ListProduct[] }> {
    const promiseData: Promise<{ count: number, products: ListProduct[] }> = this.httpClientService.get<{ count: number, products: ListProduct[] }>({
      controller: "Products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => { successCallBack ? successCallBack() : null })
      .catch((errorResponse: HttpErrorResponse) => errorCallBack ? errorCallBack(errorResponse.message) : null)

    return await promiseData;
  }
  async delete(id: string) {
    const deleteObservable: Observable<any> = this.httpClientService.delete({
      controller: "products"
    }, id);
    await firstValueFrom(deleteObservable);
  }
  async updateQRCode(productId: string, stock: number) {

    const observable = this.httpClientService.put({
      controller: "Products",
      action: "qrcode-stock-update"
    }, { productId: productId, stock: stock });

    await firstValueFrom(observable)
  }

}
