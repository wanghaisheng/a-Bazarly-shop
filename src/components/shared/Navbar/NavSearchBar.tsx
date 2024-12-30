import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const NavSearchBar = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="hidden md:flex justify-center items-center">
      <div
        tabIndex={0}
        className="flex flex-col md:flex-row w-full md:w-screen md:max-w-sm lg:max-w-md xl:max-w-2xl items-center p-1 bg-white rounded-lg"
      >
        <Input
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search everything in Bazarly"
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
  );
};

export default NavSearchBar;
