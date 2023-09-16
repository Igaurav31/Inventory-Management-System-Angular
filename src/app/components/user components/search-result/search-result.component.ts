import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CustomerService } from 'src/app/services/customer-services/customer.service';
import { ProductService } from 'src/app/services/product-services/product.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent {
  searchResultProduct: Product[] = [];
  searchTerm = '';

  constructor(
    private ProductService: ProductService,
    ActivatedRoute: ActivatedRoute,
    private Router: Router,
    private CustomerService: CustomerService
  ) {
    ActivatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.searchResultProduct = this.ProductService.getProductBySearchTerm(
          params['searchTerm']
        );
        this.searchTerm = params['searchTerm'];
      } else {
        this.searchResultProduct = this.ProductService.getAllProduct();
      }
    });
  }
  search(term: string) {
    if (term) {
      this.Router.navigateByUrl('/search/' + term);
    }
  }

  openDetails(name: any) {
    this.Router.navigate(['home/product-details/' + `${name}`]);
  }

  AddToCart(product: Product) {
    if (product != undefined) {
      this.CustomerService.addToCart(1, product);
    }
  }
}
