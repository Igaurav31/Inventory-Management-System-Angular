import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Coupon } from 'src/app/models/coupon';
import { Product } from 'src/app/models/product';
import { productAndQuantity } from 'src/app/models/product-and-quantity';
import { ProductCategory } from 'src/app/models/product-category';
// import * as productCategories from '../../../assets/Static Data/productCategory.json';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productCategoriesArray: ProductCategory[] = [];
  productArray: Product[] = [];
  couponArray: Coupon[] = [];
  keyProductCat = 'productCategoriesArray';
  keyProducts = 'productArray';
  keyCoupon = 'couponArray';

  defaultProductCategoriesArray = [
    {
      name: 'Books',
      categoryImageURL: '../../assets/Product Categories/Books.jpg',
    },
    {
      name: 'Furniture',
      categoryImageURL: '../../assets/Product Categories/Furniture.png',
    },
  ];

  defaultCouponArray = [
    {
      code: 'FIRST50',
      discountAmount: 50,
    },
    {
      code: 'SHOPIT100',
      discountAmount: 100,
    },
  ];

  defaultProductArray = [
    {
      id: 1,
      name: 'Immortals of Melugha',
      imageURL: '../../assets/Products/allBooks.jpg',
      sellingPrice: 500,
      costPrice: 100,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum consectetur, iure alias officiis iusto exercitationem',
      stock: 500,
      category: 'Books',
      tags: 'Immortals of Melugha, Books, Book, Amish Tripathi',
    },
    {
      id: 2,
      name: 'A chair',
      imageURL: '../../assets/Products/allFurniture.jpg',
      sellingPrice: 2000,
      costPrice: 1000,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum consectetur, iure alias officiis iusto exercitationem',
      stock: 500,
      category: 'Furniture',
      tags: 'chair, furniture, ikea',
    },
  ];
  constructor() {
    this.initProductArray();
    this.initProductCategoriesArray();
    this.initCouponArray();
  }

  initProductArray() {
    if (JSON.parse(localStorage.getItem(this.keyProducts)!)) {
      this.productArray = JSON.parse(
        localStorage.getItem(this.keyProducts) || '[]'
      );
      // console.log(JSON.parse(localStorage.getItem(this.localStorageKey)!));
    } else {
      this.productArray = this.defaultProductArray;
      localStorage.setItem(
        this.keyProducts,
        JSON.stringify(this.defaultProductArray)
      );
    }
  }

  initProductCategoriesArray() {
    if (JSON.parse(localStorage.getItem(this.keyProductCat)!)) {
      this.productCategoriesArray = JSON.parse(
        localStorage.getItem(this.keyProductCat) || '[]'
      );
    } else {
      this.productCategoriesArray = this.defaultProductCategoriesArray;
      localStorage.setItem(
        this.keyProductCat,
        JSON.stringify(this.defaultProductCategoriesArray)
      );
    }
  }

  initCouponArray() {
    if (JSON.parse(localStorage.getItem(this.keyCoupon)!)) {
      this.productCategoriesArray = JSON.parse(
        localStorage.getItem(this.keyCoupon) || '[]'
      );
    } else {
      this.couponArray = this.defaultCouponArray;
      localStorage.setItem(
        this.keyCoupon,
        JSON.stringify(this.defaultCouponArray)
      );
    }
  }
  getAllProductCategories(): ProductCategory[] {
    return JSON.parse(localStorage.getItem(this.keyProductCat)!);
  }

  getAllProduct(): Product[] {
    return JSON.parse(localStorage.getItem(this.keyProducts)!);
  }

  getAllCoupons(): Coupon[] {
    return JSON.parse(localStorage.getItem(this.keyCoupon)!);
  }

  getTotalProducts() {
    const products = this.getAllProduct();
    return products.length;
  }

  getTotalCategories() {
    const categories = this.getAllProductCategories();
    return categories.length;
  }

  getProductInAPerticularCategory(name: Product['name']) {
    const products = this.getAllProduct();
    let returnArry: Product[] = [];
    for (var i = 0; i < products.length; i++) {
      if (products[i].category == name && products[i] != undefined)
        returnArry.push(products[i]);
    }
    return returnArry;
  }

  getDiscountFromCouponCode(couponCode: string) {
    const coupons = this.getAllCoupons();
    const couponIndex = coupons.findIndex((p) => p.code === couponCode)!;
    if (couponIndex != -1) {
      return coupons[couponIndex].discountAmount;
    } else return 0;
  }

  removeProduct(product: Product) {
    const products = this.getAllProduct();
    const productIndex = products.findIndex((p) => p.name === product.name)!;
    products.splice(productIndex, 1);
    localStorage.setItem(this.keyProducts, JSON.stringify(products));
  }

  removeProductCategory(productCategory: ProductCategory) {
    const categories = this.getAllProductCategories();
    const catIndex = categories.findIndex(
      (p) => p.name === productCategory.name
    );
    categories.splice(catIndex, 1);
    localStorage.setItem(this.keyProductCat, JSON.stringify(categories));
  }

  addProductCategory(productCategory: ProductCategory) {
    const productCategories = this.getAllProductCategories();
    productCategories.push(productCategory);
    localStorage.setItem(this.keyProductCat, JSON.stringify(productCategories));
  }

  addProduct(product: Product) {
    const allProducts = this.getAllProduct();
    allProducts.push(product);
    localStorage.setItem(this.keyProducts, JSON.stringify(allProducts));
  }
  getProductObjectFromName(name: Product['name']): Product {
    const products = this.getAllProduct();
    let returnProduct: Product;
    returnProduct = products.find((p) => p.name == name)!;
    return returnProduct;
  }

  getProductBySearchTerm(searchTerm: string) {
    return this.getAllProduct().filter((p) =>
      p.tags.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  extractTagsFromProducts(products: Product[]): string[] {
    const tags: string[] = [];

    for (const product of products) {
      const productTags = product.tags.split(',').map((tag) => tag.trim());
      for (const tag of productTags) {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      }
    }
    return tags;
  }
}
