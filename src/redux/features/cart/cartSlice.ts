import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { TCartItem } from "@/types/TCartItem";

const initialState: TCartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TCartItem>) => {
      state.push(action.payload);
    },
    increaseQuantity: (
      state,
      action: PayloadAction<{
        product: TCartItem["product"];
        increaseBy: number;
      }>
    ) => {
      const { product, increaseBy } = action.payload;
      const existingItem = state.find((item) => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += increaseBy;
      }
    },
    resetCart: () => initialState,
  },
});

export const { addToCart, increaseQuantity, resetCart } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCart = (state: RootState): TCartItem[] => state.cart;
