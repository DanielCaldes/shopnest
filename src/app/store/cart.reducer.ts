import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart, updateProductQuantity, clearCart } from './cart.actions';
import { Product } from '../models/product.model';

export interface CartState {
  items: Product[];
}

export const initialState: CartState = {
  items: []
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product }) => {
    const existing = state.items.find(p => p.id === product.id);
    if (existing) {
      return {
        ...state,
        items: state.items.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + product.quantity } : p
        )
      };
    } else {
      return { ...state, items: [...state.items, product] };
    }
  }),
  on(removeFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter(p => p.id.toString() !== productId)
  })),
  on(updateProductQuantity, (state, { productId, quantity }) => ({
    ...state,
    items: state.items.map(p =>
      p.id.toString() === productId ? { ...p, quantity } : p
    )
  })),
  on(clearCart, (state) => ({
    ...state,
    items: []
  }))
);