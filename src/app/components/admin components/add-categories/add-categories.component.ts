import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductService } from 'src/app/services/product-services/product.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css'],
})
export class AddCategoriesComponent {
  loginForm!: FormGroup;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      imageURL: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    const category: ProductCategory = new ProductCategory();
    category.name = this.loginForm.value.name;
    category.categoryImageURL = this.loginForm.value.imageURL;
    this.productService.addProductCategory(category);
    location.reload();
  }
}
