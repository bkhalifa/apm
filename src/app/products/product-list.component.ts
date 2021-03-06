import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle: string = 'Product List';

  // showImage: boolean;

  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;

  filteredProducts: IProduct[];
  products: IProduct[];
  displayData:boolean = true;

  @ViewChild('filterElement') filterElementRef: ElementRef;
  @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;

  constructor(private productService: ProductService,
              private productParmeter:ProductParameterService) { }


  _showImage: boolean;
  get showImage():boolean{
    return this.productParmeter.showImage;
  }

  set showImage(value: boolean){
    this._showImage = value;
    this.productParmeter.showImage = value;
  }


  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.filterComponent.listFilter = this.productParmeter.filterBy
        this.performFilter(this.productParmeter.filterBy);
      },
      (error: any) => this.errorMessage = <any>error
    );
  }


  toggleImage(): void {
    this.showImage = !this.showImage;
  }


  ngAfterViewInit() {
  // console.log(this.filterElementRef.nativeElement)
  }

  onValueChange(value:string):void{
    this.productParmeter.filterBy = value
    this.performFilter(value)
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter((product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
    } else {
      this.filteredProducts = this.products;
    }
  }


}
