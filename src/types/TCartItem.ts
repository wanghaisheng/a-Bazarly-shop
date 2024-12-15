import { IProduct } from "./TProduct";

export type TCartItem = {
  product: IProduct;
  quantity: number;
  price?: number;
};
