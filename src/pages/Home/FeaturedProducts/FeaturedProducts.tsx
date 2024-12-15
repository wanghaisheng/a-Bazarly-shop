import Container from "@/components/shared/Container";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import ProductCard from "./ProductCard";
import { IProduct } from "@/types/TProduct";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { TCategory } from "@/types/TCategory";
import SectionHeader from "@/components/shared/sectionHeader";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/AuthSlice";

const FeaturedProducts = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(99999999999999);
  const [sort, setSort] = useState("asc");
  const [page, setPage] = useState(1); // Current page
  const limit = 4; // Items per page

  const user = useAppSelector(selectCurrentUser);

  const observer = useRef<IntersectionObserver | null>(null);

  const { data: categories } = useGetAllCategoriesQuery({});

  const { data, isFetching, refetch } = useGetAllProductsQuery({
    searchTerm: search,
    category,
    sortBy: "price",
    sortOrder: sort,
    minPrice,
    maxPrice: maxPrice || 999999,
    page,
    limit,
    userEmail: user?.email,
  });

  // Concatenate fetched data
  const [products, setProducts] = useState<IProduct[]>([]);

  // Update products when API data changes
  useEffect(() => {
    if (data?.data) {
      setProducts((prev) => [...prev, ...data.data]);
    }
  }, [data?.data]);

  // Implementation of infinite scrolling
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        // Check if the last item is visible and whether more data exists
        if (
          entries[0].isIntersecting &&
          products.length < (data?.meta?.total || 0)
        ) {
          setPage((prevPage) => prevPage + 1); // Load the next page
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, products, data]
  );

  return (
    <div className="py-16 lg:py-24 bg-slate-50">
      <Container>
        <div className="space-y-8">
          {/* section header */}
          <SectionHeader
            heading="Featured Products"
            subHeading="Shop the latest trends and unbeatable deals today!"
          />

          {/* Search space */}
          <div className="flex justify-center items-center">
            <div
              tabIndex={0}
              className="flex flex-col md:flex-row gap-2 w-full max-w-xl items-center space-x-2 p-1 rounded-lg"
            >
              <Input
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search here"
              />
              {/* select category */}
              <div className="flex items-center gap-2">
                <Select onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger className="w-[120px] bg-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories?.data.map((item: TCategory) => (
                        <SelectItem key={item.id} value={item?.name}>
                          {item?.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button onClick={refetch} type="submit" variant={"default"}>
                  <Search />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* price range and sorting */}
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-2 my-6 mt-10">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {products?.map((product: IProduct, index: number) => {
            if (products?.length === index + 1) {
              return (
                <div key={index} ref={lastElementRef}>
                  <ProductCard product={product} />
                </div>
              );
            } else {
              return <ProductCard key={index} product={product} />;
            }
          })}
        </div>
        {/* skeleton */}
        {isFetching && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-6 justify-between items-center mb-16">
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
        )}
        {/* not found */}
        {products?.length < 1 && (
          <h1 className="text-center text-lg text-gray-500 my-10">
            No Data Found
          </h1>
        )}
      </Container>
    </div>
  );
};

export default FeaturedProducts;
