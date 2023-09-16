import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product-services/product.service';
import { Product } from 'src/app/models/product';
import { CustomerService } from 'src/app/services/customer-services/customer.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  public id!: string;
  productToDisplayDetails!: Product;

  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService,
    private CustomerService: CustomerService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.productToDisplayDetails = this.ProductService.getProductObjectFromName(
      this.id
    );
    console.log(this.productToDisplayDetails);
  }

  AddToCart(product: Product) {
    if (product != undefined) {
      this.CustomerService.addToCart(1, product);
    }
    this.toastr.success('added to cart');
  }
}
