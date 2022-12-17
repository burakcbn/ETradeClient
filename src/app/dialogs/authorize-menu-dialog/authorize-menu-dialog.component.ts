import { AuthorizationEndpointService } from './../../sevices/common/models/authorization-endpoint.service';
import { SpinnerType } from './../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListRole } from './../../contracts/role/list-role';
import { RoleService } from './../../sevices/common/models/role.service';
import { DialogService } from 'src/app/sevices/common/dialog.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss']
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit {


  constructor(
    dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private spinner: NgxSpinnerService,
    private authorizationEndpointService: AuthorizationEndpointService) {
    super(dialogRef);
  }

  roles: { count: number, roles: ListRole[] };

  assignedRoles: Array<string>;
  listRoles: { name: string, selected: boolean }[];
  async ngOnInit() {
    this.assignedRoles = await this.authorizationEndpointService.getRolesToEndpoint(this.data.code, this.data.menuName);
    this.roles = await this.roleService.getRoles(-1, -1);

    this.listRoles = this.roles.roles.map((r: any) => {
      return {
        name: r.name,
        selected: this.assignedRoles?.indexOf(r.name) > -1
      }
    });
  }
  // async ngOnInit() {
  //   this.spinner.show(SpinnerType.BallAtom);
  //   this.roles = await this.roleService.getRoles(-1, -1, () => this.spinner.hide(SpinnerType.BallAtom));
  // }

  assignRoles(rolesComponent: MatSelectionList) {
    const roles: string[] = rolesComponent.selectedOptions.selected.map(o => o._text.nativeElement.innerText);
    this.authorizationEndpointService.assignRoleEndpoint(roles, this.data.code as string, this.data.menuName as string, () => this.spinner.hide(SpinnerType.BallAtom))

  }
}
export enum AuthorizeMenuDialogState {
  Yes = "yes",
}
