import LeftSideContent from "./LeftSideContent";
import MegaMenuBar from "./MegaMenuBar";
import NavSearchBar from "./NavSearchBar";
import RightSideContent from "./RightSideContent";
import TopNavbar from "./TopNavbar";

const Navbar = () => {
  return (
    <header>
      <section>
        <TopNavbar />
      </section>
      <section className="flex h-16 md:h-20 w-full shrink-0 justify-between items-center px-4 md:px-6 lg:px-10 z-50 bg-primary">
        {/* Left side contents */}
        <LeftSideContent />

        {/* Nav menus */}
        <NavSearchBar />

        {/* Right side menu items */}
        <RightSideContent />
      </section>
      <section>
        <MegaMenuBar />
      </section>
    </header>
  );
};

export default Navbar;
