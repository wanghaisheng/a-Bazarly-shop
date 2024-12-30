import { Outlet } from "react-router-dom";
import ScrollToTop from "../shared/ScrollToTop";
import Navbar from "../shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
