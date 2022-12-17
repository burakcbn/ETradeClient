import { ListComponent } from './list/list.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { HttpClientService, RequestParameters } from 'src/app/sevices/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {


  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) { super(spinner); }

  @ViewChild(ListComponent) listComponent: ListComponent;
  createdProduct(value:string){
    this.listComponent.getProducts();
  }
  ngOnInit(): void {
    //this.httpClientService.get({ controller: "products" }).subscribe(data => console.log(data));
    /*
     this.httpClientService.post({controller:"products"},{
       "stock": 1905,
       "price": 1905
     }).subscribe(()=>console.log("oldu"));
    */
    /*
    this.httpClientService.put({controller:"products"},{
     "id": "a82ab945-5813-4da2-a447-11062e862911",
     "stock": 1453,
     "price": 1453
   }).subscribe(()=>console.log("bunu da yaptık"));
    */
  }

}
