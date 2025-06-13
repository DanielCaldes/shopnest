import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { addToCart } from '../../store/cart.actions';
import { Store } from '@ngrx/store';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatIconModule, MatButtonModule, CommonModule, MatSnackBarModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  product: any;
  quantity : number = 1;
  constructor(private route: ActivatedRoute, private productService : ProductsService, private store: Store, private router:Router, private snackBar: MatSnackBar){}
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe((product) => {
        this.product = product;
      });
    }
  }

  addToCart(){
    if (!this.product) return;
    this.product.quantity = this.quantity;
    this.store.dispatch(addToCart({ product: { ...this.product, quantity: this.quantity } }));
    this.snackBar
      .open(`${this.quantity} x ${this.product.title} añadido al carrito`, 'Ver carrito', {
        duration: 3000,
        verticalPosition: "top"
      })
      .onAction()
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.router.navigate(['/basket']);
      });
  }
}
