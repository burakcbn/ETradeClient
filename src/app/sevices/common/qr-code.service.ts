import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from 'src/app/sevices/common/http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(private httpClientService: HttpClientService) { }

  async generateQRCode(id: string, successCallBack?: () => void, errorCallBack?: (error: string) => void) {
    const observable: Observable<Blob> = this.httpClientService.get<any>({
      controller: "Products",
      action: "qrcode",
      responseType:"blob"
    }, id);

    const promiseData = firstValueFrom(observable);
    promiseData
      .then(successCallBack)
      .catch(error => { errorCallBack(error) });
    return await promiseData
  }
}

