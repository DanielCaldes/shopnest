import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideStore } from '@ngrx/store';
import { BasketComponent } from './basket.component';

import { removeFromCart, updateProductQuantity} from '../../store/cart.actions';
import { Product } from '../../models/product.model';
import { cartReducer } from '../../store/cart.reducer';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketComponent],
      providers: [
        provideStore({ cart: cartReducer }),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark the form as invalid when empty', () => {
    component.myForm.setValue({
      name: '',
      surname: '',
      address: '',
      cp: '',
      phone: ''
    });

    expect(component.myForm.invalid).toBeTrue();
  });

  it('should mark the form as valid with valid input data', () => {
    component.myForm.setValue({
      name: 'John',
      surname: 'Doe',
      address: '123 Main St',
      cp: '12345',
      phone: '123456789'
    });

    expect(component.myForm.valid).toBeTrue();
  });

  it('should dispatch removeFromCart when deleting a product', () => {
    const storeSpy = spyOn(component['store'], 'dispatch');
    const dummyProduct : Product = { id: 1, title: 'Test Product', quantity: 1, price: 10, image: '' , description:"Dummy product", "rating":{"count":10,"rate":1.2}, category:"test"};

    component.deleteProduct(dummyProduct);

    expect(storeSpy).toHaveBeenCalledWith(
      removeFromCart({ productId: '1' })
    );
  });

  it('should dispatch updateProductQuantity when changing the product quantity', () => {
    const storeSpy = spyOn(component['store'], 'dispatch');
    const dummyProduct : Product = { id: 1, title: 'Test Product', quantity: 2, price: 10, image: '' , description:"Dummy product", "rating":{"count":10,"rate":1.2}, category:"test"};

    component.changeProductQuantity(dummyProduct, -1);

    expect(storeSpy).toHaveBeenCalledWith(
      updateProductQuantity({ productId: '1', quantity: 1 })
    );
  });

  it('should navigate to product details page when viewProductDetails is called', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.viewProductDetails(42);
    expect(routerSpy).toHaveBeenCalledWith(['/productDetails', 42]);
  });

  it('should navigate to /checkout when send is called', () => {
    const routerSpy = spyOn(component['router'], 'navigateByUrl');
    component.send();
    expect(routerSpy).toHaveBeenCalledWith('/checkout');
  });

  it('should render the title "Cesta"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Cesta');
  });

});
