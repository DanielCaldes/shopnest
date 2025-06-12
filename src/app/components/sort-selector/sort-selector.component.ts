import { Component, EventEmitter, Output } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-sort-selector',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sort-selector.component.html',
  styleUrl: './sort-selector.component.css'
})
export class SortSelectorComponent {
  @Output() sortChanged = new EventEmitter<{ field: string, direction: 'asc' | 'desc' }>();

  selectedField: string = 'price';
  selectedDirection: 'asc' | 'desc' = 'asc';

  onSortChange() {
    this.sortChanged.emit({
      field: this.selectedField,
      direction: this.selectedDirection
    });
  }
}
