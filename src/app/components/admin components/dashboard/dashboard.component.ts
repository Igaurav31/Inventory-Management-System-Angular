import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { startWith } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CustomerService } from 'src/app/services/customer-services/customer.service';
import { ProductService } from 'src/app/services/product-services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  totalCustomers: number;
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;

  showProductForm: boolean = false;
  showCategoriesForm: boolean = false;

  rowData: any[] = [];
  columnDefs: any[] = [];

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.totalCategories = productService.getTotalCategories();
    this.totalProducts = productService.getTotalProducts();
    this.totalOrders = customerService.getTotalOrders();
    this.totalCustomers = customerService.getTotalUsers();
  }

  ngOnInit() {}

  showAllCustomers() {
    this.columnDefs = [
      { headerName: 'Username', field: 'username', filter: true },
      { headerName: 'Admin', field: 'isAdmin', filter: true },
      {
        headerName: 'Remove User',

        cellRenderer: this.actionRenderer.bind(this),

        autoHeight: true,
      },
      {
        headerName: 'Make Admin',

        cellRenderer: this.actionRendererForAdmin.bind(this),

        autoHeight: true,
      },
    ];
    this.rowData = this.customerService.getRegisteredUsers();
  }

  showAllProducts() {
    this.columnDefs = [
      { headerName: 'Name', field: 'name', filter: true },
      {
        headerName: 'Image',
        field: 'imageURL',
        cellRenderer: (params: any) => {
          return `<img src="${params.value}" style = "width: 50px;height: 50px;">`;
        },
        autoHeight: true,
      },
      { headerName: 'Selling Price', field: 'sellingPrice', filter: true },
      { headerName: 'Cost Price', field: 'costPrice', filter: true },
      { headerName: 'Description', field: 'description', filter: true },
      { headerName: 'Stock', field: 'stock', filter: true },
      { headerName: 'Category', field: 'category', filter: true },
      { headerName: 'Tags', field: 'tags', filter: true },
      {
        headerName: 'Remove',
        cellRenderer: this.actionRendererForProducts.bind(this),
        autoHeight: true,
      },
    ];

    this.rowData = this.productService.getAllProduct();
  }

  showAllOrders() {
    this.columnDefs = [
      {
        headerName: 'Serial No.',
        valueGetter: 'node.rowIndex + 1',
      },
      { headerName: 'Total Bill', field: 'totalBill', filter: true },
      {
        headerName: 'Date',
        field: 'date',
        valueFormatter: this.formatDate,
        filter: true,
        sortable: true,
      },
    ];
    this.rowData = this.customerService.getOrdersArchieve();
  }

  showAllCategories() {
    this.columnDefs = [
      { headerName: 'Name', field: 'name', filter: true },
      {
        headerName: 'Image',
        field: 'categoryImageURL',
        cellRenderer: (params: any) => {
          return `<img src="${params.value}" style = "width: 50px;height: 50px;">`;
        },
        autoHeight: true,
      },
      {
        headerName: 'Remove',

        cellRenderer: this.actionRenderer.bind(this),

        autoHeight: true,
      },
    ];
    this.rowData = this.productService.getAllProductCategories();
  }
  //action renderers and their functions for All Customers table
  actionRenderer(params: any) {
    const button = document.createElement('button');

    button.innerHTML = 'Remove';

    button.addEventListener('click', () => this.deleteUser(params.data));

    return button;
  }

  actionRendererForAdmin(params: any) {
    const button = document.createElement('button');

    if (this.customerService.checkIfAdmin(params.data)) {
      button.innerHTML = 'Remove Admin';
    } else {
      button.innerHTML = 'Make Admin';
    }

    button.addEventListener('click', () => this.makeAdmin(params.data));

    return button;
  }
  deleteUser(user: any) {
    this.customerService.removeUser(user);
    location.reload();
  }

  makeAdmin(user: any) {
    this.customerService.makeUserAdmin(user);
    location.reload();
  }

  //action renderers and their functions for All products table
  actionRendererForProducts(params: any) {
    const button = document.createElement('button');

    button.innerHTML = 'Remove';

    button.addEventListener('click', () => this.deleteProduct(params.data));

    return button;
  }
  deleteProduct(product: Product) {
    this.productService.removeProduct(product);
    location.reload();
  }

  //function for orders
  formatDate(params: any) {
    if (params.value) {
      return new Date(params.value).toString();
    }
    return ' ';
  }
  //FORM FUNCTIONS
  toggleProductForm() {
    this.showProductForm = !this.showProductForm;
  }

  toggleCategoryForm() {
    this.showCategoriesForm = !this.showCategoriesForm;
  }
}
