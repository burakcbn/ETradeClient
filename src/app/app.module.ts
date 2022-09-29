import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UiModule } from './ui/ui.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpErrorHandlerInterceptorService } from './sevices/common/http-error-handler-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config:{
        //Bu alandaki tokenı alıp tum uygulamada kullanır 
        tokenGetter:()=>localStorage.getItem("accessToken"),
        //bu tokenı gondereceği adresi belirliyoruz
        allowedDomains:[("localhost:7299")]
      }
    })
  ],
  providers: [{provide:"baseUrl",useValue:"https://localhost:7299/api",multi:true},
{provide:HTTP_INTERCEPTORS,useClass:HttpErrorHandlerInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
