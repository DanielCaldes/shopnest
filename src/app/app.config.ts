import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { cartReducer } from './store/cart.reducer';
import { loadState } from './store/localstorage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(
      { cart: cartReducer },
      { initialState: loadState() }
    ),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideNgxMask(),
  ]
};
