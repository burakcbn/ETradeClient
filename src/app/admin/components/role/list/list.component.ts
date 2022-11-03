import { ListRole } from 'src/app/contracts/role/list-role';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType } from 'src/app/sevices/admin/alertify.service';
import { RoleService } from 'src/app/sevices/common/models/role.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['name', 'edit', 'delete'];
  dataSource: MatTableDataSource<ListRole> = (null);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private roleService: RoleService,
    private alertifyService: AlertifyService,
    ngxSpinner: NgxSpinnerService,
  ) { super(ngxSpinner) }
  
  ngOnInit(): void {
    this.getRoles();

  }

  async getRoles() {
    this.show(SpinnerType.BallSpinClockwiseFadeRotating);

    const allRoles: { count: number, roles: ListRole[] } = await this.roleService.getRoles(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
      () => { this.hide(SpinnerType.BallSpinClockwiseFadeRotating) },
      (errorMessage) => {
        this.alertifyService.message(errorMessage, {
          dismissOthers: true,
          messageType: MessageType.Error
        })
      }
    )
    this.dataSource = new MatTableDataSource<ListRole>(allRoles.roles);
    this.paginator.length = allRoles.count;
  }
  async pageChanged() {
    await this.getRoles();
  }

}
