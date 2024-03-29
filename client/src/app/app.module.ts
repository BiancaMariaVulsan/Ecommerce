import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProductsingleComponent } from './productsingle/productsingle.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { AddressComponent } from './address/address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductService } from './services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductVariantService } from './services/productvariant.service';
import { CategoryService } from './services/categories.service';
import { PaymentComponent } from './payment/payment.component';
import { AccountService } from './services/account.service';
import { JwtModule } from "@auth0/angular-jwt";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutService } from './services/checkout.service';
import { CartService } from './services/cart.service';
import { PaymentStripeComponent } from './payment-stripe/payment-stripe.component';
import { AdminComponent } from './admin/admin.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AdminproductComponent } from './adminproduct/adminproduct.component';
import { NewproductComponent } from './newproduct/newproduct.component';

export function tokenGetter() {
  return localStorage.getItem("eshop-jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsingleComponent,
    CartComponent,
    CheckoutComponent,
    ShopComponent,
    DashboardComponent,
    OrdersComponent,
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ProfileDetailsComponent,
    AddressComponent,
    EditAddressComponent,
    PaymentComponent,
    PaymentStripeComponent,
    AdminComponent,
    AdminproductComponent,
    NewproductComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    SlickCarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://127.0.0.1:8000"],
        disallowedRoutes: []
      }
    }),
  ],
  providers: [ProductService, ProductVariantService, CategoryService, AccountService, CheckoutService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
