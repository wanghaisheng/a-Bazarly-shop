export interface ICustomer {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address?: string | null;
  profilePhoto: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
