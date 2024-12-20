import { ICustomer } from "./TCustomer";
import { IProduct } from "./TProduct";

export interface IReview {
  id: string;
  comment?: string;
  rating: number;
  customerId: string;
  productId: string;
  product: IProduct;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  customer: ICustomer;
}
