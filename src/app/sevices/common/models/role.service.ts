import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from 'src/app/sevices/common/http-client.service';
import { Injectable } from '@angular/core';
import { ListRole } from 'src/app/contracts/role/list-role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientService: HttpClientService) { }

  async getRoles(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (error) => void): Promise<{count:number,roles:ListRole[]}> {
    const observable: Observable<{count:number,roles:ListRole[]}> = this.httpClientService.get< {count:number,roles:ListRole[]}>({
      controller: "Roles",
      queryString:`page=${page}&size=${size}`
    })
    const promiseData = firstValueFrom(observable);
    promiseData
      .then(successCallBack)
      .catch(error => errorCallBack(error));
    return await promiseData;
  }
  async create(name: string, successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "roles"
    }, { name: name });

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack)
      .catch(errorCallBack);

    return await promiseData as { succeeded: boolean };
  }

}
