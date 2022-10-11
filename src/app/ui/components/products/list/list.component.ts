import { Component, OnInit } from '@angular/core';
import { ListProduct } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/sevices/common/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private productService: ProductService) { }

  products: ListProduct[];
  async ngOnInit() {
    const data: { count: number, products: ListProduct[] } = await this.productService.read(0, 12,
      () => {

      },
      errorMessage => {

      })

    this.products = data.products;
  }

}
