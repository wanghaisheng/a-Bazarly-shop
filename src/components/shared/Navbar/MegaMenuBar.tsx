import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { TCategory } from "@/types/TCategory";
import { Link } from "react-router-dom";
import MegaMenuItem from "./MegaMenuItem";

const MegaMenuBar = () => {
  const { data: categoriesData } = useGetAllCategoriesQuery({});

  return (
    <div className="hidden lg:block z-50 border-b border-opacity-40 px-4 md:px-6 lg:px-10 py-2">
      <NavigationMenu className="w-full max-w-screen-2xl mx-auto justify-start">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-bold">
              All Categories
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {categoriesData?.data?.map((item: TCategory) => (
                  <MegaMenuItem key={item.id} category={item} />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to={`/products`}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                All Products
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to={`/shops`}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                All Shops
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {categoriesData?.data?.map((item: TCategory) => (
            <NavigationMenuItem key={item.id}>
              <Link to={`/products?category=${item?.name}`}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item?.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default MegaMenuBar;
