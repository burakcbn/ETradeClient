import { UserService } from 'src/app/sevices/common/models/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BaseComponent, SpinnerType } from './../../../../base/base.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from 'src/app/sevices/admin/alertify.service';
import { DialogService } from 'src/app/sevices/common/dialog.service';
import { ListUser } from 'src/app/contracts/user/list-user';
import { AuthorizeUserDialogComponent } from 'src/app/dialogs/authorize-user-dialog/authorize-user-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService,
    private userService: UserService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService) {
    super(spinner)
  }

  displayedColumns: string[] = ['nameSurname', 'userName', 'email', 'twoFactorEnabled', 'role', 'delete'];
  dataSource: MatTableDataSource<ListUser> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getUsers() {
    this.show(SpinnerType.BallAtom);
    const allUsers: { count: number; users: ListUser[] } = await this.userService.getAllUsers(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hide(SpinnerType.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.Top_Right
    }))
    this.dataSource = new MatTableDataSource<ListUser>(allUsers.users);
    this.paginator.length = allUsers.count;
  }

  async pageChanged() {
    await this.getUsers();
  }

  async ngOnInit() {
    await this.getUsers();
  }

  assignRole(id: string) {
    this.dialogService.openDialog({
      componentType:AuthorizeUserDialogComponent,
      data:id,
      afterClosed:()=>{

      },
      options:{
        witdh:"750px"
      }
    })
  }

}
