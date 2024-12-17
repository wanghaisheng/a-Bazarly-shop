import { RootState } from "@/redux/store";
import { IProduct } from "@/types/TProduct";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface ComparisonState {
  products: IProduct[]; // Store product IDs for comparison
}

const initialState: ComparisonState = {
  products: [],
};

const comparisonSlice = createSlice({
  name: "comparison",
  initialState,
  reducers: {
    addToComparison: (state, action: PayloadAction<IProduct>) => {
      if (!state.products.find((item) => item.id === action.payload.id)) {
        if (state.products.length >= 3) {
          state.products.pop();
        }
        state.products.push(action.payload);
      }
      toast.success("Added to Comparison");
    },
    removeFromComparison: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
    },
    resetComparison: (state) => {
      state.products = [];
    },
  },
});

export const { addToComparison, removeFromComparison, resetComparison } =
  comparisonSlice.actions;

export default comparisonSlice.reducer;

export const selectComparisonProducts = (state: RootState): IProduct[] =>
  state.comparison.products;
