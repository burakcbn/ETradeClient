import { OrdersModule } from './orders/orders.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';
import { RoleModule } from './role/role.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    CustomersModule,
    ProductsModule,
    OrdersModule,
    AuthorizeMenuModule,
    RoleModule
  ],
  exports:[
    
  ]
})
export class ComponentsModule { }
