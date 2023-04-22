import { Supplier } from './../../contracts/supplier/supplier';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from 'src/app/sevices/common/http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private httpClientService: HttpClientService) { }

  async get():Promise<Supplier[]> {
    const observable: Observable<Supplier[]> = this.httpClientService.get({
      controller: "Suppliers"
    })

    const promiseData= firstValueFrom(observable);
    promiseData
    .then()
    .catch();
    
    return await promiseData;
  }
}
