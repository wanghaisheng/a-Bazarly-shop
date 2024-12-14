import Container from "@/components/shared/Container";
import SectionHeader from "@/components/shared/sectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { TCategory } from "@/types/TCategory";
import { Link } from "react-router-dom";

const CategoriesSection = () => {
  const { data } = useGetAllCategoriesQuery({});
  const categories = data?.data;

  return (
    <div>
      <Container>
        {/* header */}
        <SectionHeader
          heading="Featured Category"
          subHeading="Get Your Desired Product from Featured Category!"
        />
        {/* category display */}
        {data ? (
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 my-14">
            {categories?.map((item: TCategory) => (
              <Link
                to={`/products?categoryId=${item.id}`}
                key={item.id}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <img
                  src={item.image as string}
                  alt="category image"
                  className="size-24 object-cover rounded-full border-2 border-primary p-1"
                />
                <h3 className="group-hover:text-primary font-medium">
                  {item.name}
                </h3>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 my-14">
            {Array.from({ length: 6 }).map((_: unknown, index: number) => (
              <div key={index} className="space-y-4 flex flex-col items-center">
                <Skeleton className="size-24 rounded-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default CategoriesSection;
