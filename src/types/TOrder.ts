import { IProduct } from "./TProduct";

export type IOrderItem = {
  id: string;
  orderId: string;
  productId: string;
  product: IProduct;
  quantity: number;
  price: number;
  discount: number;
};

export type IOrder = {
  id: string;
  customerId: string;
  shopId: string;
  totalAmount: number;
  status: "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentType: "ONLINE" | "COD";
  paymentStatus: "PAID" | "UNPAID";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  orderItem: IOrderItem[];
};
