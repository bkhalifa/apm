import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';

@Component({
  selector: 'pm-product-shell-detail',
  templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  // get allow to etect the changes side service
  get product(): IProduct {
    return this.productService.currentProduct;
  }
  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

}
