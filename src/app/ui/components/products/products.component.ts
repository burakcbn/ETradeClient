import { HttpClientService } from 'src/app/sevices/common/http-client.service';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Dynamic, Filter } from 'src/app/contracts/dynamic/filter';
import { firstValueFrom } from 'rxjs';

export interface Task {
  name: string;
  color: ThemePalette;
  subtasks?: ProductPrice[];
}
export interface ProductPrice {
  name: string;
  color: string;
  completed: boolean;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {


  constructor(spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpClientService: HttpClientService) { super(spinner); }
  task: Task = {
    name: 'Fiyat',
    color: 'warn',
    subtasks: [
      { name: '0-100', completed: false, color: 'warn' },
      { name: '100-200', completed: false, color: 'warn' },
      { name: '200-300', completed: false, color: 'warn' },
    ],
  };
  allFilters: Filter[] = [];
  productPrice: ProductPrice;

  a: number = 0;
  b: number = 0

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(param => {
      this.show(SpinnerType.BallAtom);
      this.allFilters = [];
      const dynamic = new Dynamic();
      this.createDynamicForCategory(param["c"], param["p"]);
      this.createDynamicForProduct(param["p"]);

      this.hide(SpinnerType.BallAtom);
      dynamic.filter = this.allFilters;
      dynamic.sort = [];
      const data = JSON.stringify(dynamic);
      this.httpClientService.post({
        controller: "Products",
        action: "deneme",
        queryString: "page=0&size=5"
      }, { dynamic: dynamic }).subscribe(z => console.log(z));
    })
  }

  updateAllComplete(subtasks: ProductPrice) {
    this.productPrice = subtasks;
    this.task.subtasks.filter((p: ProductPrice) => {
      if (p.name != subtasks.name)
        p.completed = false;
    });
    this.router.navigate(["/products"], { queryParams: { p: subtasks.name }, queryParamsHandling: "merge" });

  }

  createDynamicForCategory(queries: string[], productPrice: string) {
    if (queries !== undefined) {
      for (let index = 0; index < queries.length; index++) {
        const filter = new Filter();
        filter.field = "categoryId";
        filter.operator = "==";
        filter.value = queries[index];
        if (index !== queries.length - 1)
          filter.logic = "||";
        else if (productPrice !== undefined)
          filter.logic = "&&";
        this.allFilters.push(filter);
      }
    }
  }

  createDynamicForProduct(productPrice: string) {
    if (productPrice !== undefined) {
      const filter = new Filter();
      const _filter = new Filter();
      filter.field = "Price";
      filter.operator = "<=";
      if (productPrice === "0-100")
        filter.value = "100";
      else if (productPrice === "100-200") {
        filter.value = "200";
        filter.logic = "&&";
        _filter.field = "Price";
        _filter.operator = ">";
        _filter.value = "100";
      }
      else {
        filter.value = "300";
        filter.logic = "&&";
        _filter.field = "Price";
        _filter.operator = ">";
        _filter.value = "200";
      }

      this.allFilters.push(filter);
      if (Object.keys(_filter).length !== 0) {
        this.allFilters.push(_filter);
      }
    }
  }

}
