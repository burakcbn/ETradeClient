import { MatTableModule } from '@angular/material/table';
import { FileUploadModule } from './../sevices/common/file-upload/file-upload.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { BasketItemRemoveDialogComponent } from './basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogComponent } from './shopping-complete-dialog/shopping-complete-dialog.component';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CompleteOrderDialogComponent } from './complete-order-dialog/complete-order-dialog.component';
import { AuthorizeMenuDialogComponent } from './authorize-menu-dialog/authorize-menu-dialog.component'
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductImageDialogComponent,
    BasketItemRemoveDialogComponent,
    ShoppingCompleteDialogComponent,
    OrderDetailDialogComponent,
    CompleteOrderDialogComponent,
    AuthorizeMenuDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,FileUploadModule,MatTableModule,MatToolbarModule,MatBadgeModule
  ]
})
export class DialogModule { }
