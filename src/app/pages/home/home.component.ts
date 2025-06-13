import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../../components/products/products.component';
import { SearchComponent } from '../../components/search/search.component';
import { ProductsService } from '../../services/products/products.service';
import { SortSelectorComponent } from '../../components/sort-selector/sort-selector.component';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductsComponent, SearchComponent, SortSelectorComponent,
    CategoryFilterComponent, MatButtonModule, MatIconModule,
    MatPaginatorModule, MatProgressSpinnerModule, CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  loading: boolean = true;
  
  products: any[];
  filteredProducts: any[];
  categories: string[] = [];
  selectedCategories: string[] = [];
  searchKeyword: string = '';
  selectedSort: { field: string, direction: 'asc' | 'desc' } = { field: 'price', direction: 'asc' };
  showFilters: boolean = false;

  pagedProducts: any[];
  pageSize = 10;
  pageIndex = 0;

  constructor(private productsService:ProductsService){
    this.products = [];
    this.filteredProducts =[];
    this.pagedProducts = [];
  }

  ngOnInit() {
    this.loading = false;

    const load$ = this.productsService.getProducts();

    const delaySpinner$ = timer(500).pipe(
      tap(() => this.loading = true)
    );

    delaySpinner$.pipe(
      takeUntil(load$)
    ).subscribe();

    load$.subscribe(data => {
      this.products = data;
      this.filteredProducts = [...data];
      this.categories = [...new Set(data.map(p => p.category))];
      this.applyFilters();
      this.updatePagedProducts();
      this.loading = false;
    });
  }
  
  updatePagedProducts() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    this.pageIndex = 0;

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
    this.updatePagedProducts();
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
}
