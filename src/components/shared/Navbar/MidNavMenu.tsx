import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { selectComparisonProducts } from "@/redux/features/comparison/comparisonSlice";
import { useAppSelector } from "@/redux/hook";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const MidNavMenu = () => {
  const comparisonProducts = useAppSelector(selectComparisonProducts);

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        <NavigationMenuLink asChild>
          <Link
            to="/"
            className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-base font-medium text-white hover:text-slate-800 dark:hover:text-gray-50 "
          >
            Home
          </Link>
        </NavigationMenuLink>

        {/* products */}
        <NavigationMenuLink asChild>
          <Link
            to="/products"
            className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-base font-medium text-white hover:text-slate-800 dark:hover:text-gray-50 "
          >
            Products
          </Link>
        </NavigationMenuLink>

        {
          <NavigationMenuLink asChild>
            <Link
              to="/recent-products"
              className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-base font-medium text-white hover:text-slate-800 dark:hover:text-gray-50 "
            >
              Recent Viewed
            </Link>
          </NavigationMenuLink>
        }

        {
          <NavigationMenuLink asChild>
            <Link
              to="/compare-products"
              className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-base font-medium text-white hover:text-slate-800 dark:hover:text-gray-50  relative"
            >
              Compare
              {comparisonProducts.length > 0 && (
                <Badge
                  variant="secondary"
                  className="absolute -top-2 -right-0 rounded-full bg-white px-2"
                >
                  {comparisonProducts.length}
                </Badge>
              )}
            </Link>
          </NavigationMenuLink>
        }

        {/* contact */}
        <NavigationMenuLink asChild>
          <HashLink
            to="/contact"
            className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-base font-medium text-white hover:text-slate-800 dark:hover:text-gray-50 "
          >
            Contact
          </HashLink>
        </NavigationMenuLink>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MidNavMenu;
