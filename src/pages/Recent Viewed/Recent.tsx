import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRecentProductQuery } from "@/redux/features/recentProducts/recentProductsApi";
import { IProduct } from "@/types/TProduct";
import ProductCard from "../Products/ProductUtils/ProductCard";
import { useEffect } from "react";

const Recent = () => {
  const { data, isFetching, refetch } = useGetRecentProductQuery(undefined);
  const products = data?.data.map((item: { product: IProduct }) => ({
    ...item.product,
  }));

  // Refetch data when user comes back into view
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="py-12 lg:py-16 bg-slate-50">
      <Container>
        <div className="mb-8">
          {/* section header */}
          <SectionHeading
            heading="Recently Viewed Products"
            subHeading="Take another look at the products you loved!"
          />
        </div>

        {/* data mapping */}
        {isFetching ? (
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
        ) : products?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {products?.map((item: IProduct) => (
              <ProductCard key={item?.id} product={item} />
            ))}
          </div>
        ) : (
          <h1 className="text-center text-lg text-gray-500 my-10">
            No Data Found
          </h1>
        )}
      </Container>
    </div>
  );
};

export default Recent;
