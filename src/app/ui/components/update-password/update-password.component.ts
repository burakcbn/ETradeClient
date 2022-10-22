import { UserService } from 'src/app/sevices/common/models/user.service';
import { ToastrService } from 'ngx-toastr';
import { async } from 'rxjs';
import { UserAuthService } from 'src/app/sevices/common/models/user-auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/sevices/ui/custom-toastr.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
    private userAuthService: UserAuthService,
    private activatedRoute: ActivatedRoute,
    private toastrService: CustomToastrService,
    private userService: UserService,
    private router: Router) { super(spinner); }

  state: any;
  async ngOnInit() {

    this.show(SpinnerType.BallAtom)

    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const resetToken = params["resetToken"];
        this.state = await this.userAuthService.verifyResetToken(resetToken, userId, () => {
          this.hide(SpinnerType.BallAtom)
        });
        if (this.state.state === false) {
          this.toastrService.message("Yapmak istediğiniz işlem geçersizdir", "Hata", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopCenter
          });
        }
      }
    })
  }
  updatePassword(password: string, passwordConfirm: string) {
    this.show(SpinnerType.BallAtom);
    if (password != passwordConfirm) {
      this.toastrService.message("Şifreler eşlememektedir", "Hata", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopCenter,
      });
      this.hide(SpinnerType.BallAtom);
      return;
    }
    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const resetToken = params["resetToken"];
        await this.userService.updatePassword(userId, resetToken, password, passwordConfirm,
          () => {
            this.toastrService.message("Şifre güncellemesi başarılı", "Başarılı", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopCenter,
            });
            this.router.navigate(["/login"])
          }, error => {

          });
      }
    })
  }

}
