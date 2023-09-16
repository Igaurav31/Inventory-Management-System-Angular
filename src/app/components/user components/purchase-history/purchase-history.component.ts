import { Component } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { CustomerService } from 'src/app/services/customer-services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css'],
})
export class PurchaseHistoryComponent {
  purchaseHistory: Cart[];

  constructor(customerService: CustomerService, private Router: Router) {
    this.purchaseHistory = customerService.getPurchaseHistory();
    console.log(this.purchaseHistory);
  }

  navigateTo(pageName: string) {
    this.Router.navigate(['home/' + `${pageName}`]);
  }
}
