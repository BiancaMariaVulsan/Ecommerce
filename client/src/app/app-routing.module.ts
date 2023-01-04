import { NewproductComponent } from './newproduct/newproduct.component';
import { AdminproductComponent } from './adminproduct/adminproduct.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductsingleComponent } from './productsingle/productsingle.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ShopComponent } from './shop/shop.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { PaymentStripeComponent } from './payment-stripe/payment-stripe.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'product-single/:id', component: ProductsingleComponent},
  {path: 'admin-product/:id', component: AdminproductComponent},
  {path: 'new-product', component: NewproductComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart', component: CartComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: 'Admin' }},
  {path: 'order', component: OrdersComponent},
  {path: 'address', component: AddressComponent},
  {path: 'edit-address', component: EditAddressComponent}, 
  {path: 'profile-details', component: ProfileDetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'payment', component: PaymentComponent, canActivate: [AuthGuard]},
  {path: 'payment-stripe', component: PaymentStripeComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
