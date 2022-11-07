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

  roles: { count: number, roles: ListRole[] };

  constructor(dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private spinner: NgxSpinnerService,
    private authorizationEndpointService: AuthorizationEndpointService) {
    super(dialogRef);

  }

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallAtom);
    this.roles = await this.roleService.getRoles(-1, -1, () => this.spinner.hide(SpinnerType.BallAtom));
  }

  assignRole(rolesComponent: MatSelectionList) {
    this.spinner.show(SpinnerType.BallAtom)
    const roles: string[] = rolesComponent.selectedOptions.selected.map(o => o._text.nativeElement.innerText);
    this.authorizationEndpointService.assignRoleEndpoint(roles, this.data.code as string, this.data.name as string,
      () => {
        this.spinner.hide(SpinnerType.BallAtom);
      },
      (error) => {

      })

  }
}
export enum AuthorizeMenuDialogState {
  Yes = "yes",
}
