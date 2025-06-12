import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css'
})
export class CategoryFilterComponent implements OnInit{
  @Input() categories: string[] = [];
  @Output() categorySelected = new EventEmitter<string[]>();
  categoriesFormControl = new FormControl<string[]>([]);

  ngOnInit(): void {
    this.categoriesFormControl.valueChanges.subscribe(selectedCategories => {
      this.selectCategory(selectedCategories!);
    })
  }

  selectCategory(categoryId: string[]) {
    this.categorySelected.emit(categoryId);
  }
}
