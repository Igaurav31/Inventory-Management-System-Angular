import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginPageComponent } from './components/shared/login-page/login-page.component';
import { CartComponent } from './components/user components/cart/cart.component';
import { DashboardComponent } from './components/admin components/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryCardComponent } from './components/user components/category-card/category-card.component';
import { ProductDetailsComponent } from './components/user components/product-details/product-details.component';
import { ProductInAPerticularCategoryComponent } from './components/user components/product-in-a-perticular-category/product-in-a-perticular-category.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './components/user components/homepage/homepage.component';
import { SuccessPageComponent } from './components/shared/success-page/success-page.component';
import { ReturnProuductsPageComponent } from './components/user components/return-prouducts-page/return-prouducts-page.component';
import { RegisterPageComponent } from './components/shared/register-page/register-page.component';
import { ToastrModule } from 'ngx-toastr';
import { SearchResultComponent } from './components/user components/search-result/search-result.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AdminHeaderComponent } from './components/admin components/admin-header/admin-header.component';
import { AgGridModule } from 'ag-grid-angular';

import { PurchaseHistoryComponent } from './components/user components/purchase-history/purchase-history.component';
import { AddProductsComponent } from './components/admin components/add-products/add-products.component';
import { AddCategoriesComponent } from './components/admin components/add-categories/add-categories.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutComponent } from './components/user components/checkout/checkout.component';
import { PurchaseDetailsComponent } from './components/user components/purchase-details/purchase-details.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { InsightsTableComponent } from './components/admin components/insights-table/insights-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginPageComponent,
    CartComponent,
    DashboardComponent,
    CategoryCardComponent,
    ProductDetailsComponent,
    ProductInAPerticularCategoryComponent,
    HomepageComponent,
    SuccessPageComponent,
    ReturnProuductsPageComponent,
    RegisterPageComponent,
    SearchResultComponent,
    AdminHeaderComponent,
    PurchaseHistoryComponent,
    AddProductsComponent,
    AddCategoriesComponent,
    CheckoutComponent,
    PurchaseDetailsComponent,
    PageNotFoundComponent,
    InsightsTableComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatAutocompleteModule,
    AgGridModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
