import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { IProduct } from "@/types/TProduct";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const NavSearchBar = () => {
  const [search, setSearch] = useState("");
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  // hide search results when clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchResultsRef.current &&
      !searchResultsRef.current.contains(event.target as Node)
    ) {
      setIsSearchResultsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { data: productsData } = useGetAllProductsQuery({
    searchTerm: search || "undefined",
  });
  const products = productsData?.data;

  return (
    <div className="relative">
      <div className="hidden md:flex justify-center items-center">
        <div
          tabIndex={0}
          className="flex flex-col md:flex-row w-full md:w-screen md:max-w-sm lg:max-w-md xl:max-w-2xl items-center p-1 bg-white rounded-lg"
        >
          <Input
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsSearchResultsVisible(true)}
            type="search"
            placeholder="Search everything in Bazarly"
            value={search}
            className="font-semibold border-none focus-visible:ring-0"
          />
          {/* select category */}
          <Button
            type="submit"
            variant={"ghost"}
            className="bg-white text-primary"
          >
            <Search />
          </Button>
        </div>
      </div>
      {products?.length > 0 && isSearchResultsVisible && (
        <div
          ref={searchResultsRef}
          className="p-3 bg-white rounded-lg shadow-lg border-t md:w-screen md:max-w-sm lg:max-w-md xl:max-w-2xl absolute"
        >
          <div
            className={`${
              products?.length > 0 && isSearchResultsVisible
                ? "visible"
                : "hidden"
            }`}
          >
            {products?.map((product: IProduct) => (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                onClick={() => setSearch("")}
                className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded-md"
                />
                <div className="ml-2">
                  <h3 className="text-sm font-semibold">{product.name}</h3>
                  <p className="text-sm font-bold text-primary">
                    ৳{product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavSearchBar;
