import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './sevices/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './sevices/ui/custom-toastr.service';
declare var $: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETradeClientRepeatAgain';
  constructor(public authService: AuthService, private toastrService: CustomToastrService,private router:Router) {
    authService.identityCheck();
  }

  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate(["login"]);
    this.toastrService.message("Çıkış başarılı şekilde gerçekleştirildi","Çıkış",{
      messageType:ToastrMessageType.Warning,
      position:ToastrPosition.TopRight
    })
  }
}