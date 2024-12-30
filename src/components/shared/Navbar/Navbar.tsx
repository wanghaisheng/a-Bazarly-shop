import LeftSideContent from "./LeftSideContent";
import MegaMenuBar from "./MegaMenuBar";
import MidNavMenu from "./MidNavMenu";
import RightSideContent from "./RightSideContent";

const Navbar = () => {
  return (
    <header>
      <section className="flex h-16 md:h-20 w-full shrink-0 justify-between items-center px-4 md:px-6 shadow-sm lg:shadow-none sticky top-0 z-50 backdrop-blur-3xl bg-primary">
        {/* Left side contents */}
        <LeftSideContent />

        {/* Nav menus */}
        <MidNavMenu />

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
