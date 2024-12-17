import { TCategory } from "./TCategory";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  image: string;
  categoryId: string;
  category: TCategory;
  shopId: string;
  status: "ACTIVE" | "DRAFT" | "PAUSED" | "ARCHIVED" | "DELETED";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
