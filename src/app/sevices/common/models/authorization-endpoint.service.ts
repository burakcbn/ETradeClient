import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {

  constructor(private httpClientService: HttpClientService) { }

  async assignRoleEndpoint(roles: string[], code: string, menu: string, successCallBack?: () => void, erroCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "AuthorizationEndpoints"
    },
      {
        roles: roles,
        code: code,
        menu: menu,
      });
    const promiseData = firstValueFrom(observable);
    promiseData
      .then(() => successCallBack)
      .catch((error) => erroCallBack(error));
    await promiseData;
  }
}
