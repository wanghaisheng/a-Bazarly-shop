import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { TCategory } from "@/types/TCategory";
import { Link } from "react-router-dom";

const MegaMenuItem = ({ category }: { category: TCategory }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={`/products?category=${category?.name}`}
          className={
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          }
        >
          <div className="flex items-center gap-4">
            <div className="max-w-8">
              <img src={category.image as string} alt="category" />
            </div>
            <h3 className="font-semibold leading-none">
              {category.name}
            </h3>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export default MegaMenuItem;
