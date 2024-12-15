import { ICustomer } from "./TCustomer";

export interface IFollowedShop {
  id: string;
  customerId: string;
  shopId: string;
  createdAt: string;
  updatedAt: string;
  customer: ICustomer;
}
