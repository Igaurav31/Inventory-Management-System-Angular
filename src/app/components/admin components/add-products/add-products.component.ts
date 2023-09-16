import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductService } from 'src/app/services/product-services/product.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent {
  loginForm!: FormGroup;
  productCategories: ProductCategory[] = [];
  constructor(private productService: ProductService) {
    this.productCategories = this.productService.getAllProductCategories();
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      imageURL: new FormControl(null, [Validators.required]),
      sellingPrice: new FormControl(null, [Validators.required]),
      costPrice: new FormControl(null, [Validators.required]),
      stock: new FormControl(null, [Validators.required]),
      tags: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    const product: Product = new Product();

    product.category = this.loginForm.value.category;
    product.name = this.loginForm.value.name;
    product.imageURL = this.loginForm.value.imageURL;
    product.sellingPrice = this.loginForm.value.sellingPrice;
    product.costPrice = this.loginForm.value.costPrice;
    product.stock = this.loginForm.value.stock;
    product.tags = this.loginForm.value.tags;
    product.description = this.loginForm.value.description;
    this.productService.addProduct(product);
    location.reload();
  }
}
