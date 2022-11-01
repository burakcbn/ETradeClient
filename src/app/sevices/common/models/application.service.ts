import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from 'src/app/sevices/common/http-client.service';
import { Injectable } from '@angular/core';
import { Menu } from 'src/app/contracts/application-configurations/menu';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientService: HttpClientService) { }

  async getAuthorizeDefinitionEndpoints(successCallBack?: () => void, errorCallBack?: (error) => void): Promise<Menu[]> {
    const observable: Observable<Menu[]> = this.httpClientService.get<Menu[]>({
      controller: "ApplicationServices"
    });
    const promiseData = firstValueFrom(observable);
    promiseData
      .then(() => successCallBack)
      .catch((error) => errorCallBack(error));
    return await promiseData;
  }
}
