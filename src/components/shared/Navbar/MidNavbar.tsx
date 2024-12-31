import LeftSideContent from "./LeftSideContent";
import NavSearchBar from "./NavSearchBar";
import RightSideContent from "./RightSideContent";

const MidNavbar = () => {
  return (
    <div className="px-4 md:px-6 lg:px-10 bg-primary z-50">
      <div className="flex h-16 md:h-20 shrink-0 justify-between items-center w-full max-w-screen-2xl mx-auto">
        {/* Left side contents */}
        <LeftSideContent />

        {/* Nav menus */}
        <NavSearchBar />

        {/* Right side menu items */}
        <RightSideContent />
      </div>
    </div>
  );
};

export default MidNavbar;
