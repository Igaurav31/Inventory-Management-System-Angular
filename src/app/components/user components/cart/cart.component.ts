import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { productAndQuantity } from 'src/app/models/product-and-quantity';
import { ProductService } from 'src/app/services/product-services/product.service';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer-services/customer.service';

@Component({
  selector: 'app-cart',

  templateUrl: './cart.component.html',

  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartImportedFromService: productAndQuantity[];

  totalBillOfCart: number;
  couponCode = '';
  discountAmount = 0;
  newDiscount!: number;

  constructor(
    private ProductService: ProductService,

    private router: Router,

    private CustomerService: CustomerService
  ) {
    this.CustomerService = CustomerService;

    this.cartImportedFromService = this.CustomerService.getProductsInCart();

    this.totalBillOfCart = this.CustomerService.getTotalBillOfCart();
  }

  removeFromCart(product: Product) {
    this.CustomerService.removeProductFromCart(product);
    this.updateTotalBill();
    location.reload();
  }

  updateQuantity(product: Product, index: number) {
    let newQuantity = this.cartImportedFromService[index].quantity;
    this.CustomerService.updateQuantityInCart(product, newQuantity);

    this.cartImportedFromService = this.CustomerService.getProductsInCart();
    this.updateTotalBill();

    // this.totalBillOfCart = this.CustomerService.getTotalBillOfCart();

    // location.reload();
  }

  buyCart() {
    this.CustomerService.buyProductsInCart();
    this.CustomerService.makeCartEmpty();
    this.router.navigate(['/success']);
  }

  private updateTotalBill() {
    this.totalBillOfCart = this.CustomerService.getTotalBillOfCart();
  }

  getDiscount(couponCode: string) {}

  redirToCheckout() {
    this.router.navigate(['home/checkout']);
  }
}
