export interface IProductQueryParams
  extends Record<string, string | number | undefined> {
  searchTerm?: string;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  minPrice?: number;
  maxPrice?: number;
  shopId?: string;
  userEmail?: string;
}

export interface ICategoryQueryParams
  extends Record<string, string | number | undefined> {
  searchTerm?: string;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}
