import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryFilterComponent } from './category-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CategoryFilterComponent', () => {
  let component: CategoryFilterComponent;
  let fixture: ComponentFixture<CategoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CategoryFilterComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        NoopAnimationsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryFilterComponent);
    component = fixture.componentInstance;
    component.categories = ['Cat1', 'Cat2', 'Cat3'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the categories in the select options', () => {
    // Abre el select para que las opciones se rendericen
    const select = fixture.debugElement.query(By.css('mat-select')).nativeElement;
    select.click();
    fixture.detectChanges();

    const matOptions = Array.from(document.querySelectorAll('mat-option'));
    expect(matOptions.length).toBe(3);
    expect(matOptions[0].textContent?.trim()).toBe('Cat1');
    expect(matOptions[1].textContent?.trim()).toBe('Cat2');
    expect(matOptions[2].textContent?.trim()).toBe('Cat3');
  });

  it('should emit selected categories when selection changes', () => {
    spyOn(component.categorySelected, 'emit');

    component.categoriesFormControl.setValue(['Cat1', 'Cat3']);
    fixture.detectChanges();

    expect(component.categorySelected.emit).toHaveBeenCalledWith(['Cat1', 'Cat3']);
  });
});
