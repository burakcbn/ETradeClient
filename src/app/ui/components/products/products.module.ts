import { CategoriesComponent } from './../categories/categories.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ListComponent } from './list/list.component';
import { CategoriesModule } from '../categories/categories.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {MatButton, MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    ProductsComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    CategoriesModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: "", component: ProductsComponent }
    ])
  ]
})
export class ProductsModule { }
