import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeader";
import { useGetAllShopsQuery } from "@/redux/features/shop/shopApi";
import { IShop } from "@/types/TShop";
import ShopCard from "./ShopCard";

const AllShops = () => {
  const { data } = useGetAllShopsQuery({});
  const shops = data?.data;

  return (
    <div className="py-16">
      <Container>
        <div>
          <SectionHeading
            heading="Explore All Shops"
            subHeading="Discover a variety of products from your favorite shops in one place!"
          />
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {shops?.map((item: IShop) => (
              <ShopCard key={item?.id} shop={item} />
            ))}
          </section>
        </div>
      </Container>
    </div>
  );
};

export default AllShops;
