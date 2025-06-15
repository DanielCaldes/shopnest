import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CheckoutComponent } from './checkout.component';
import { provideNgxMask } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { selectCartItems } from '../../store/cart.selectors';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutComponent, BrowserAnimationsModule],
      providers: [
        provideMockStore({ initialState: { cart: { items: [] } } }),
        provideNgxMask({ validation: true, dropSpecialCharacters: false }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectCartItems, []);

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;

    component.cardNumber = '';
    component.expireDate = '';
    component.cvc = '';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit button when form is invalid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;

    component.cardNumber = '';
    component.expireDate = '';
    component.cvc = '';
    fixture.detectChanges();

    expect(submitButton.disabled).toBeTrue();
  });

  it('should dispatch clearCart and navigate on successful payment', (done) => {
  const storeSpy = spyOn(component['store'], 'dispatch');
  const routerSpy = spyOn(component['router'], 'navigateByUrl');

  component.cardNumber = '4111111111111111';
  component.expireDate = '12/25';
  component.cvc = '123';

  component.onCheckoutSubmit();

  expect(component.loading).toBeTrue();

  setTimeout(() => {
      expect(storeSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith('/payment-success');
      expect(component.loading).toBeFalse();
      done();
    }, 3100);
  });

  it('should show alert and not navigate on failed payment (card number 4999...)', (done) => {
    spyOn(window, 'alert');
    const storeSpy = spyOn(component['store'], 'dispatch');
    const routerSpy = spyOn(component['router'], 'navigateByUrl');

    component.cardNumber = '4999999999999999';
    component.expireDate = '12/25';
    component.cvc = '123';

    component.onCheckoutSubmit();

    expect(component.loading).toBeTrue();

    setTimeout(() => {
        expect(window.alert).toHaveBeenCalledWith('Hay un error procesando la compra, revise los datos introducidos.');
        expect(storeSpy).not.toHaveBeenCalled();
        expect(routerSpy).not.toHaveBeenCalled();
        expect(component.loading).toBeFalse();
        done();
      }, 3100);
  });

  it('should show loading spinner when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const spinner = compiled.querySelector('mat-spinner');

    expect(spinner).toBeTruthy();
  });

});
