import { CategoriesModule } from './categories/categories.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { UpdatePasswordModule } from './update-password/update-password.module';
import { ProductsModule } from './../../admin/components/products/products.module';
import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule, 
    BasketsModule,
    HomeModule,
    ProductsModule,
    RegisterModule,
    LoginModule,
    UpdatePasswordModule,
    PasswordResetModule,
    CategoriesModule
  ],
  exports:[
    BasketsModule
  ]
})
export class ComponentsModule { }
