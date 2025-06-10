import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'
import { Router } from '@angular/router';

interface Product{
  id : number;
  title : string;
  price : number;
  description : string;
  category : string;
  image:string;
  rating : {rate: number; count:number};
  quantity : number;
}

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent implements OnInit{
  mocked : Product[];
  result = 0;
  myForm : FormGroup;
  numberProducts = 0;

  constructor(private fb:FormBuilder, private router:Router){
    this.myForm = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(2)]],
      surname: ['',[Validators.required, Validators.minLength(2)]],
      address: ['',[Validators.required]],
      cp: ['',[Validators.required,Validators.minLength(8)]],
      phone: ['',[Validators.required]]
    });

    this.mocked=[
    {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
            "rate": 3.9,
            "count": 120
        },
        "quantity": 1
    },
    {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "rating": {
            "rate": 4.1,
            "count": 259
        },
        "quantity":2
    }
  ];
  }

  ngOnInit(): void {
    this.mocked.forEach(product => {
      this.updateTotals(product.quantity, product.quantity * product.price);
    });
  }

  deleteProduct(product:Product){
    const index = this.mocked.indexOf(product);
    if(index!= -1){
      this.mocked.splice(index, 1);
      this.updateTotals(-product.quantity, -product.quantity * product.price);
    }
  }

  changeProductQuantity(product:Product, quantity : number){
    product.quantity += quantity;
    this.updateTotals(quantity, quantity * product.price);
  }

  viewProductDetails(id:number){
    this.router.navigate(['/productDetails', id]);
  }

  send(){
    console.log("Comprado");
  }

  private updateTotals(quantityDelta: number, priceDelta: number): void {
    this.numberProducts += quantityDelta;
    this.result += priceDelta;
    this.result = this.roundToTwo(this.result);
  }

  private roundToTwo(value: number): number {
    return parseFloat(value.toFixed(2));
  }
}
