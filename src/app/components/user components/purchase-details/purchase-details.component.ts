import { Component, OnDestroy, OnInit } from '@angular/core';

import { productAndQuantity } from 'src/app/models/product-and-quantity';
import { ProductService } from 'src/app/services/product-services/product.service';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer-services/customer.service';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.css'],
})
export class PurchaseDetailsComponent {
  cartImportedFromService: productAndQuantity[];

  totalBillOfCart: number;
  couponCode = '';
  discountAmount = 0;
  newDiscount!: number;

  constructor(
    private CustomerService: CustomerService,
    private Router: Router
  ) {
    this.CustomerService = CustomerService;

    this.cartImportedFromService = this.CustomerService.getProductsInCart();

    this.totalBillOfCart = this.CustomerService.getTotalBillOfCart();
  }

  navigateTo(pageName: string) {
    this.Router.navigate(['home/' + `${pageName}`]);
  }
}
