import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartItems, selectCartTotalPrice, selectCartTotalQuantity } from '../../store/cart.selectors';
import { Product } from '../../models/product.model'
import { removeFromCart, updateProductQuantity } from '../../store/cart.actions';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent{
  cartItems$: Observable<Product[]>;
  totalPrice$: Observable<number>;
  totalQuantity$: Observable<number>;
  
  myForm : FormGroup;

  constructor(private fb:FormBuilder, private router:Router, private store:Store){
    this.myForm = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(2)]],
      surname: ['',[Validators.required, Validators.minLength(2)]],
      address: ['',[Validators.required]],
      cp: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(8)]],
      phone: ['',[Validators.required]]
    });

    this.cartItems$ = this.store.select(selectCartItems);
    this.totalPrice$ = this.store.select(selectCartTotalPrice);
    this.totalQuantity$ = this.store.select(selectCartTotalQuantity);
  }

  deleteProduct(product:Product){
    this.store.dispatch(removeFromCart({ productId: product.id.toString() }));
  }

  changeProductQuantity(product: Product, delta: number): void {
    const newQuantity = product.quantity + delta;

    if (newQuantity <= 0) {
      this.store.dispatch(removeFromCart({ productId: product.id.toString() }));
    } else {
      this.store.dispatch(
        updateProductQuantity({
          productId: product.id.toString(),
          quantity: newQuantity
        })
      );
    }
  }

  viewProductDetails(id:number){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/productDetails', id]);
  }

  send() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigateByUrl('/checkout');
  }
}
