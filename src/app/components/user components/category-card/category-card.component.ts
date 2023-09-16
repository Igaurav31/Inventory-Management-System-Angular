import { Component } from '@angular/core';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductService } from 'src/app/services/product-services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css'],
})
export class CategoryCardComponent {
  Categories: ProductCategory[] = [];
  constructor(private ProductService: ProductService, private router: Router) {}

  goToPage(pageName: any) {
    this.router.navigate(['home/product/' + `${pageName}`]);
  }

  ngOnInit(): void {
    this.Categories = this.ProductService.getAllProductCategories();
  }
}
