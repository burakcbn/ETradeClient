import { DialogModule } from './../../../dialogs/dialog.module';
import { FileUploadModule } from './../../../sevices/common/file-upload/file-upload.module';
import { FileUploadComponent } from './../../../sevices/common/file-upload/file-upload.component';
import { DeleteDialogComponent } from './../../../dialogs/delete-dialog/delete-dialog.component';
import { DeleteDirective } from './../../../directives/admin/delete.directive';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';
@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    ListComponent,    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"" ,component:ProductsComponent}
    ]),
    DeleteDirectiveModule,
    MatSidenavModule,
    MatFormFieldModule,MatInputModule,MatButtonModule,MatPaginatorModule,MatTableModule,
    DialogModule,
    FileUploadModule
  ]
})
export class ProductsModule { }
