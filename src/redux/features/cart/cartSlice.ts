import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { TCartItem } from "@/types/TCartItem";
import { toast } from "sonner";

const initialState: { products: TCartItem[] } = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TCartItem>) => {
      const { product, quantity } = action.payload;

      const existingItem = state.products.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        existingItem.quantity += quantity;
        toast.success("Quantity increased");
      } else {
        state.products.push(action.payload);
        toast.success("Added to cart");
      }
    },
    removeFromCart: (state, action: PayloadAction<TCartItem>) => {
      const { product } = action.payload;
      state.products = state.products.filter(
        (item) => item.product.id !== product.id
      );
    },
    resetCart: () => initialState,
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartProducts = (state: RootState): TCartItem[] =>
  state.cart.products;
