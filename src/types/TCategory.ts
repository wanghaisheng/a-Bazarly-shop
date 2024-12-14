export type TCategory = {
  id: string;
  name: string;
  description?: string | null;
  image?: string | null;
  parentId?: string | null;
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};
