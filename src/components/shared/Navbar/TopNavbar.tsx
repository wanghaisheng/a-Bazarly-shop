import { Link } from "react-router-dom";

const TopNavbar = () => {
  return (
    <div className="hidden md:flex h-10 w-full shrink-0 justify-between items-center px-4 md:px-6 lg:px-10 z-50 bg-primary border-b border-zinc-300 border-opacity-40">
      <div className="text-sm text-zinc-100 font-semibold transition-all flex items-center gap-5">
        <Link to={"/faq"} className="hover:text-slate-800">
          FAQ
        </Link>
        <Link to={"/my-account"} className="hover:text-slate-800">
          My account
        </Link>
        <Link to={"/about-us"} className="hover:text-slate-800">
          About Us
        </Link>
        <Link to={"/contact"} className="hover:text-slate-800">
          Contact
        </Link>
      </div>

      {/* Top bar right side menu items */}
      <div className="text-sm text-zinc-100 font-semibold transition-all flex items-center gap-5">
        <Link to={""} className="hover:text-slate-800">
          Call Us +880 1234-567890
        </Link>
      </div>
    </div>
  );
};

export default TopNavbar;
