import Container from "@/components/shared/Container";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/types/TProduct";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { TCategory } from "@/types/TCategory";
import ProductCard from "./ProductUtils/ProductCard";
import { useSearchParams } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import CustomPagination from "@/components/shared/Pagination";

const AllProducts = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(99999999999999);
  const [sort, setSort] = useState("asc");

  // filter by category if specified
  const [params] = useSearchParams();
  const categoryQuery = params.get("category");
  if (categoryQuery && !category) {
    setCategory(categoryQuery as string);
  }

  const { data: categories } = useGetAllCategoriesQuery({});

  const { data, isFetching } = useGetAllProductsQuery({
    category,
    sortBy: "price",
    sortOrder: sort,
    minPrice,
    maxPrice: maxPrice || 99999999999999,
  });
  const products = data?.data;
  const pages = Math.ceil(data?.meta?.total / data?.meta?.limit);

  return (
    <div className="py-8 bg-slate-100">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <section className="lg:col-span-1 max-h-fit space-y-2">
            <div className="bg-white shadow-sm p-4 rounded-lg">
              <h1 className="text-xl font-semibold text-gray-900 mb-2">
                Price Range
              </h1>
              <div className="flex items-center gap-2">
                <Input
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  type="number"
                  placeholder="Min price"
                  className="max-w-36"
                />
                <Input
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  type="number"
                  placeholder="Max price"
                  className="max-w-36"
                />
              </div>
            </div>
            <div className="bg-white shadow-sm p-4 rounded-lg">
              <h1 className="text-xl font-semibold text-gray-900 mb-2">
                Categories
              </h1>
              <div className="">
                <RadioGroup
                  onValueChange={(value) => setCategory(value)}
                  defaultValue="all"
                  className="gap-0"
                >
                  <div className="flex items-center space-x-2 py-2 cursor-pointer">
                    <RadioGroupItem value="" id="all" />
                    <Label htmlFor="all" className="w-full cursor-pointer">
                      All Category
                    </Label>
                  </div>
                  {categories?.data?.map((item: TCategory) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-2 py-2 cursor-pointer"
                    >
                      <RadioGroupItem value={item.name} id={item.name} />
                      <Label
                        htmlFor={item.name}
                        className="w-full cursor-pointer"
                      >
                        {item.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </section>
          <section className="lg:col-span-3 flex-1 space-y-1">
            <div className="flex justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
              <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
              {/* sorting */}
              <Select onValueChange={(value) => setSort(value)}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Default Sorting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="asc" defaultChecked>
                      Price Low to High
                    </SelectItem>
                    <SelectItem value="desc">Price High to Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* data mapping */}
            {isFetching ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 justify-between items-center pt-2">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="space-y-4">
                    <Skeleton className="h-52 w-full rounded-xl" />
                    <div className="space-y-4">
                      <Skeleton className="h-4 w-10/12" />
                      <Skeleton className="h-6 w-4/12" />
                      <Skeleton className="h-4 w-5/12" />
                      <Skeleton className="h-10 w-12/12" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pt-2">
                {products?.map((item: IProduct) => (
                  <ProductCard key={item?.id} product={item} />
                ))}
              </div>
            ) : (
              <h1 className="text-center text-lg text-gray-500 pt-20">
                No Data Found
              </h1>
            )}

            {/* showing pagination */}
            {products?.length > 0 && (
              <div className="py-8 pt-12">
                <CustomPagination pages={pages} page={page} setPage={setPage} />
              </div>
            )}
          </section>
        </div>
      </Container>
    </div>
  );
};

export default AllProducts;
