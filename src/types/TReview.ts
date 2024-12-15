import { ICustomer } from "./TCustomer";

export interface IReview {
  id: string;
  comment?: string;
  rating: number;
  customerId: string;
  productId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  customer: ICustomer;
}
