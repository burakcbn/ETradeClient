import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from 'src/app/sevices/common/http-client.service';
import { Injectable } from '@angular/core';
import { User } from 'src/app/entities/user';
import { CreateUser } from 'src/app/contracts/user/create_user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { Token } from 'src/app/contracts/token/token';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }


  async create(user: User): Promise<CreateUser> {

    const observable: Observable<CreateUser | User> = this.httpClientService.post<CreateUser | User>({
      controller: "users",
    }, user);

    return await firstValueFrom(observable) as CreateUser;
  }

  async updatePassword(userId: string, resetToken: string, password: string, passwordConfirm: string, successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "Users",
      action: "update-password"
    }, {
      userId: userId,
      resetToken: resetToken,
      password: password,
      passwordConfirm: passwordConfirm
    });
    const promiseData = firstValueFrom(observable);
    promiseData
      .then(() => successCallBack)
      .catch(error => errorCallBack(error));
    await promiseData;
  }
}
