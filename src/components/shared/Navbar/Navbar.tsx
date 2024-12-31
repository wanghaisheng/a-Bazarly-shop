import MegaMenuBar from "./MegaMenuBar";
import MidNavbar from "./MidNavbar";
import TopNavbar from "./TopNavbar";

const Navbar = () => {
  return (
    <>
      <section>
        <TopNavbar />
      </section>
      <section className="sticky top-0 z-50">
        <MidNavbar />
      </section>
      <section>
        <MegaMenuBar />
      </section>
    </>
  );
};

export default Navbar;
