import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product-services/product.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer-services/customer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user = JSON.parse(sessionStorage.getItem('currentuser')!);
  username = this.user.username;
  searchResultProduct: Product[] = [];
  searchTerm = '';
  suggestions: string[] = [];
  noOfProductsInCart = 0;
  constructor(
    private ProductService: ProductService,
    private Router: Router,
    private fb: FormBuilder,
    private CustomerService: CustomerService
  ) {
    this.searchResultProduct = this.ProductService.getAllProduct();
  }
  ngOnInit() {
    this.noOfProductsInCart = this.CustomerService.getCartLength();
  }

  logout() {
    sessionStorage.removeItem('currentuser');
    location.reload();
  }

  search(term: string) {
    if (term) {
      this.Router.navigateByUrl('/search/' + term);
    }
  }

  clearSearch() {
    this.searchTerm = '';
  }

  onChange() {
    this.suggestions = this.ProductService.extractTagsFromProducts(
      this.searchResultProduct
    ).filter((tag) =>
      tag.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectSuggestion(suggestion: string) {
    this.searchTerm = suggestion;
    this.suggestions = [];
  }

  navigateTo(pageName: string) {
    this.Router.navigate(['home/' + `${pageName}`]);
  }
}
