import { Component } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { productAndQuantity } from 'src/app/models/product-and-quantity';
import { CustomerService } from 'src/app/services/customer-services/customer.service';
import { ProductService } from 'src/app/services/product-services/product.service';

@Component({
  selector: 'app-return-prouducts-page',
  templateUrl: './return-prouducts-page.component.html',
  styleUrls: ['./return-prouducts-page.component.css'],
})
export class ReturnProuductsPageComponent {
  lastCart: Cart = new Cart();
  productsInLastCart: productAndQuantity[] = [];

  constructor(
    private ProductService: ProductService,
    private CustomerService: CustomerService
  ) {
    this.lastCart = this.CustomerService.getLastBill();
    this.productsInLastCart = this.CustomerService.getProductsInLastBill();
  }

  returnProducts() {}

  removeFromCart(product: Product, index: number) {
    console.log(this.productsInLastCart);
    this.CustomerService.removeProductFromLastBill(product, index);
    console.log(this.productsInLastCart);
  }

  updateQuantity(product: Product, index: number) {
    // if (this.productsInLastCart[index].quantity == 0) {
    //   this.productsInLastCart.splice(index, 1);
    //   this.lastCart.totalBill -= this.productsInLastCart[index].product.sellingPrice;
    // }

    var updatedBill =
      this.productsInLastCart[index].product.sellingPrice *
      this.productsInLastCart[index].quantity;
    this.productsInLastCart[index].subtotal = updatedBill;

    let temptotal = 0;
    for (let i = 0; i < this.productsInLastCart.length; i++) {
      temptotal += this.productsInLastCart[i].subtotal;
    }
    this.lastCart.totalBill = temptotal;
    //part to be updated
    // let newQuantity = this.productsInLastCart[index].quantity;
    // console.log(newQuantity)

    // this.ProductService.updateQuantityInCart(product, newQuantity);
    // this.totalBillOfCart = this.ProductService.getTotalBillOfCart();
  }
}
