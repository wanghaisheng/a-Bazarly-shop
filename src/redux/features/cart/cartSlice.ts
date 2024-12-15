import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { TCartItem } from "@/types/TCartItem";

const initialState: TCartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TCartItem>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.find((item) => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<TCartItem>) => {
      const { product } = action.payload;
      return state.filter((item) => item.product.id !== product.id);
    },
    resetCart: () => initialState,
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCart = (state: RootState): TCartItem[] => state.cart;
