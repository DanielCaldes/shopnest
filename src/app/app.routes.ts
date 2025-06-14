import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { BasketComponent } from './pages/basket/basket.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'productDetails/:id', component: ProductDetailsComponent },
  { path: 'basket', component: BasketComponent},
  { path: 'checkout', component:CheckoutComponent},
  { path: 'payment-success', component:PaymentSuccessComponent}
];
