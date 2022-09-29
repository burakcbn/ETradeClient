import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
   
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class ComponentsModule { }
