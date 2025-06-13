import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

export const selectCartTotalQuantity = createSelector(
  selectCartItems,
  (items) => items.reduce((acc, item) => acc + item.quantity, 0)
);

export const selectCartTotalPrice = createSelector(
  selectCartItems,
  (items) => roundToTwo(items.reduce((acc, item) => acc + item.quantity * item.price, 0))
);

function roundToTwo(value: number): number {
  return Math.round(value * 100) / 100;
}