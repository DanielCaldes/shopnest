import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../../components/products/products.component';
import { SearchComponent } from '../../components/search/search.component';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  products: any[];
  filteredProducts: any[];

  constructor(private productsService:ProductsService){
    this.products = [];
    this.filteredProducts =[];
  }

  ngOnInit() {
    this.productsService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = [...data]; 
      console.log('Productos cargados:', this.products);
    });
  }
  
  filterProducts(keyword: string){
    this.filteredProducts = this.products.filter(
      product => product.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}
