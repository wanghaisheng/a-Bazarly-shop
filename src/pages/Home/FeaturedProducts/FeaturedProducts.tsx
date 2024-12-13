import Container from "@/components/shared/Container";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import ProductCard from "./ProductCard";
import { IProduct } from "@/types/TProduct";

const FeaturedProducts = () => {
  const { data } = useGetAllProductsQuery({});
  const products = data?.data;

  return (
    <div className="py-16 lg:py-24 bg-slate-50">
      <Container>
        <div>
          {/* section header */}
          <h1 className="text-slate-900 text-3xl md:text-4xl font-extrabold mb-4 text-center">
            Featured Products
          </h1>
          <p className="text-slate-600 text-lg md:text-xl font-medium text-center">
            Shop the latest trends and unbeatable deals today!
          </p>
          {/* products container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
            {products?.map((item: IProduct) => (
              <ProductCard key={item?.id} product={item} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FeaturedProducts;
