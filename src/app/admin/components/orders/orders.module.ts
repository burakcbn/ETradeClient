import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { ListComponent } from './list/list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { FileUploadModule } from 'src/app/sevices/common/file-upload/file-upload.module';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';



@NgModule({
  declarations: [
    OrdersComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"" ,component:OrdersComponent}
    ]),
    DeleteDirectiveModule,
    MatSidenavModule,
    MatFormFieldModule,MatInputModule,MatButtonModule,MatPaginatorModule,MatTableModule,
    DialogModule,
    FileUploadModule
  ],
})
export class OrdersModule { }
