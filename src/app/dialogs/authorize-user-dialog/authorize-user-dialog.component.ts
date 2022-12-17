import { AlertifyService, MessageType, Position } from './../../sevices/admin/alertify.service';
import { UserService } from 'src/app/sevices/common/models/user.service';
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListRole } from 'src/app/contracts/role/list-role';
import { RoleService } from 'src/app/sevices/common/models/role.service';
import { BaseDialog } from '../base/base-dialog';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrls: ['./authorize-user-dialog.component.scss']
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent> implements OnInit {

  constructor(
    dialogRef: MatDialogRef<AuthorizeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private userService:UserService,
    private spinner: NgxSpinnerService,
    private alertifyService:AlertifyService) {
    super(dialogRef);
  }
  
  roles: { count: number, roles: ListRole[] };
  assignedRoles: Array<string>;
  listRoles: { name: string, selected: boolean }[];
  async ngOnInit() {
   this.assignedRoles = await this.userService.getRolesToUser(this.data);
 
    this.roles = await this.roleService.getRoles(-1, -1);

    this.listRoles = this.roles.roles.map((r: any) => {
      return {
        name: r.name,
        selected: this.assignedRoles?.indexOf(r.name) > -1
      }
    });
  }
  async assignRoles(rolesComponent: MatSelectionList) {
    this.spinner.show(SpinnerType.BallAtom);
    const roles: string[] = rolesComponent.selectedOptions.selected.map(o => o._text.nativeElement.innerText);
    this.userService.assignRoleToUser(this.data,roles ,() =>{ 
      this.spinner.hide(SpinnerType.BallAtom)
      this.alertifyService.message("Başarılı atama ",
      {
        messageType:MessageType.Success,
        position:Position.Bottom_Right
      })
    })

  }

}
