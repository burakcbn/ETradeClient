import { AlertifyService, MessageType, AlertifyOptions, Position } from './../../../sevices/admin/alertify.service';
import { UserAuthService } from 'src/app/sevices/common/models/user-auth.service';
import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent extends BaseComponent {

  constructor(spinner: NgxSpinnerService,
    private userAuthService: UserAuthService,
    private alertifyService:AlertifyService) { super(spinner); }

  passwordReset(email: string) {
    this.show(SpinnerType.BallSpinClockwiseFadeRotating);
    this.userAuthService.passwordReset(email, () => {
      this.alertifyService.message("Şifre yenileme için hesabınıza mail gönderilmiştir",{
        messageType:MessageType.Success,
        position:Position.Top_Right
      });
      this.hide(SpinnerType.BallSpinClockwiseFadeRotating)
    });

  }
}
