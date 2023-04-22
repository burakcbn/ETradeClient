import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { ListCategory } from 'src/app/contracts/category/list-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClientService: HttpClientService) { }

  async getAllCategory(): Promise<ListCategory> {
    const observable: Observable<ListCategory> = this.httpClientService.get({
      controller: "Categories",
    });

    const promiseData = firstValueFrom(observable);
    promiseData
      .then()
      .catch();

    return await promiseData;
  }

}
