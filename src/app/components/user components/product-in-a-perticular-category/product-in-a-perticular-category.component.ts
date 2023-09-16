import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product-services/product.service';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer-services/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-in-a-perticular-category',
  templateUrl: './product-in-a-perticular-category.component.html',
  styleUrls: ['./product-in-a-perticular-category.component.css'],
})
export class ProductInAPerticularCategoryComponent {
  public id!: string;
  displayCategories: Product[] = [];
  productToBeAddedToCart: Product = new Product();

  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService,
    private router: Router,
    private CustomerService: CustomerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.displayCategories =
      this.ProductService.getProductInAPerticularCategory(this.id);
  }
  openDetails(name: any) {
    this.router.navigate(['home/product-details/' + `${name}`]);
  }

  AddToCart(product: Product) {
    if (product != undefined) {
      this.CustomerService.addToCart(1, product);
    }
    this.toastr.success('added to cart');
  }
}
