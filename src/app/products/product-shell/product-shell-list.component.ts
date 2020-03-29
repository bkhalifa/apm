import { Component, OnInit, OnDestroy } from '@angular/core';

import { IProduct } from '../product';
import { ProductService } from '../product.service';
import { Subscribable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Products';
  errorMessage: string;
  products: IProduct[];

  selectedPorduct: IProduct | null;
  sub: Subscription;

  constructor(private productService: ProductService) { }


  onSelected(product: IProduct) {
    this.productService.changeSelectedProduct(product)
  }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      selectedPorduct => this.selectedPorduct = this.selectedPorduct
    )
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
      },
      (error: any) => this.errorMessage = <any>error
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
