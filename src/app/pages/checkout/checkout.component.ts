import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { clearCart } from '../../store/cart.actions';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, MatInputModule, FormsModule, NgxMaskDirective, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  cardNumber : string = "";
  expireDate : string = "";
  cvc : string = "";
  loading = false;

  constructor(private router:Router, private store:Store){}

  onCheckoutSubmit(){
    this.loading = true;

    setTimeout(() => {
      this.loading = false;

      if (this.cardNumber !== "4999999999999999") {
        this.store.dispatch(clearCart());
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.router.navigateByUrl("/payment-success");
      } else {
        alert('Hay un error procesando la compra, revise los datos introducidos.');
      }
    }, 3000);
  }
}
