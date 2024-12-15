export interface IProductQueryParams
  extends Record<string, string | number | undefined> {
  searchTerm?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  shopId?: string;
  userEmail?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface ICategoryQueryParams
  extends Record<string, string | number | undefined> {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface IReviewQueryParams
  extends Record<string, string | number | undefined> {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  shopId?: string;
}

export interface IShopQueryParams
  extends Record<string, string | number | undefined> {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}
