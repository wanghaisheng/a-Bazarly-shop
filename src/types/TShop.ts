export interface IShop {
  id: string;
  name: string;
  description?: string;
  logoUrl: string;
  phoneNumber: string;
  shopAddress?: string;
  status: string;
  vendorId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
