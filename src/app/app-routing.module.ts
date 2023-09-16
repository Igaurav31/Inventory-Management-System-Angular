import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CartComponent } from './components/user components/cart/cart.component';
import { LoginPageComponent } from './components/shared/login-page/login-page.component';
import { HomepageComponent } from './components/user components/homepage/homepage.component';
import { ProductInAPerticularCategoryComponent } from './components/user components/product-in-a-perticular-category/product-in-a-perticular-category.component';
import { ProductDetailsComponent } from './components/user components/product-details/product-details.component';
import { SuccessPageComponent } from './components/shared/success-page/success-page.component';
import { ReturnProuductsPageComponent } from './components/user components/return-prouducts-page/return-prouducts-page.component';
import { RegisterPageComponent } from './components/shared/register-page/register-page.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { DashboardComponent } from './components/admin components/dashboard/dashboard.component';
import { RoleGuard } from './guards/role.guard';
import { SearchResultComponent } from './components/user components/search-result/search-result.component';

import { PurchaseHistoryComponent } from './components/user components/purchase-history/purchase-history.component';
import { AddCategoriesComponent } from './components/admin components/add-categories/add-categories.component';
import { AddProductsComponent } from './components/admin components/add-products/add-products.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { CheckoutComponent } from './components/user components/checkout/checkout.component';
import { PurchaseDetailsComponent } from './components/user components/purchase-details/purchase-details.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [AuthenticationGuard],
    component: HomepageComponent,
  },
  {
    path: 'home/cart',
    canActivate: [AuthenticationGuard],
    component: CartComponent,
  },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'home/product/:id',
    canActivate: [AuthenticationGuard],
    component: ProductInAPerticularCategoryComponent,
  },
  {
    path: 'home/product-details/:id',
    canActivate: [AuthenticationGuard],
    component: ProductDetailsComponent,
  },
  {
    path: 'home/success',
    canActivate: [AuthenticationGuard],
    component: SuccessPageComponent,
  },
  {
    path: 'home/return/:id',
    canActivate: [AuthenticationGuard],
    component: ReturnProuductsPageComponent,
  },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'search/:searchTerm',
    canActivate: [AuthenticationGuard],
    component: SearchResultComponent,
  },
  {
    path: 'home/your-orders',
    canActivate: [AuthenticationGuard],
    component: PurchaseHistoryComponent,
  },
  {
    path: 'home/your-orders/:id',
    canActivate: [AuthenticationGuard],
    component: PurchaseDetailsComponent,
  },
  {
    path: 'dashboard',
    canActivate: [RoleGuard],
    component: DashboardComponent,
    children: [
      { path: 'add-categories', component: AddCategoriesComponent },
      { path: 'add-products', component: AddProductsComponent },
    ],
  },
  {
    path: 'home/checkout',
    component: CheckoutComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
