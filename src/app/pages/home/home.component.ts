import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../../components/products/products.component';
import { SearchComponent } from '../../components/search/search.component';
import { ProductsService } from '../../services/products/products.service';
import { SortSelectorComponent } from '../../components/sort-selector/sort-selector.component';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent, SearchComponent, SortSelectorComponent, CategoryFilterComponent, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  products: any[];
  filteredProducts: any[];
  categories: string[] = [];
  selectedCategories: string[] = [];
  searchKeyword: string = '';
  selectedSort: { field: string, direction: 'asc' | 'desc' } = { field: 'price', direction: 'asc' };
  showFilters: boolean = false;

  constructor(private productsService:ProductsService){
    this.products = [];
    this.filteredProducts =[];
  }

  ngOnInit() {
    this.productsService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = [...data];
      this.categories = [...new Set(data.map(p => p.category))];
      this.applyFilters();
      console.log('Productos cargados:', this.products);
    });
  }
  
  filterProducts(keyword: string){
    this.searchKeyword = keyword;
    this.applyFilters();
  }

  onCategorySelected(categories: string[]) {
    this.selectedCategories = categories;
    this.applyFilters();
  }
  
  onSortChanged(sort: { field: string, direction: 'asc' | 'desc' }) {
    this.selectedSort = sort;
    this.applyFilters();
  }

  applyFilters() {
    let result = [...this.products];

    result = this.products.filter(
      product => product.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );

    if (this.selectedCategories?.length) {
      result = result.filter(p =>
        this.selectedCategories.includes(p.category)
      );
    }

    const path = this.selectedSort.field;
    result.sort((a, b) => {
      const aValue = this.getNestedValue(a, path);
      const bValue = this.getNestedValue(b, path);
      if (aValue < bValue) return this.selectedSort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.selectedSort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredProducts = result;
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
}
