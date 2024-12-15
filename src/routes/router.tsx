import DashboardLayout from "@/components/layout/DashboardLayout";
import MainLayout from "@/components/layout/MainLayout";
import AboutUs from "@/pages/AboutUs/AboutUs";
import ContactUs from "@/pages/ContactUs/ContactUs";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import SignUp from "@/pages/SignUp/SignUp";
import { createBrowserRouter } from "react-router-dom";
import Error404Page from "@/pages/Error/Error404Page";
import UnauthorizedAccess from "@/pages/Error/UnauthorizedAccess";
import PrivateRoutes from "./PrivateRoutes";
import AllProducts from "@/pages/Products/Products";
import ProductDetails from "@/pages/ProductDetails/ProductDetails";
import Shop from "@/pages/Shop/Shop";
import Cart from "@/pages/Cart/Cart";
import Checkout from "@/pages/Checkout/Checkout";
import ProtectedRoutes from "./ProtectedRoutes";
import PaymentSuccess from "@/pages/Payment/PaymentSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error404Page />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/shops/:id",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/payment/success",
        element: (
          <ProtectedRoutes role="CUSTOMER">
            <PaymentSuccess />
          </ProtectedRoutes>
        ),
      },
      // {
      //   path: "/payment/fail/:id",
      //   element: (
      //     <ProtectedRoutes role="user">
      //       <PaymentFail />
      //     </ProtectedRoutes>
      //   ),
      // },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/unauthorized-access",
        element: <UnauthorizedAccess />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      // {
      //   path: "index",
      //   element: <Dashboard />,
      // },
      // {
      //   path: "my-bookings",
      //   element: (
      //     <ProtectedRoutes role="user">
      //       <UserBookings />
      //     </ProtectedRoutes>
      //   ),
      // },
      // {
      //   path: "bookings",
      //   element: (
      //     <ProtectedRoutes role="admin">
      //       <AdminBookings />
      //     </ProtectedRoutes>
      //   ),
      // },
      // {
      //   path: "facilities",
      //   element: (
      //     <ProtectedRoutes role="admin">
      //       <AdminFacilities />
      //     </ProtectedRoutes>
      //   ),
      // },
      // {
      //   path: "add-facility",
      //   element: (
      //     <ProtectedRoutes role="admin">
      //       <AddFacility />
      //     </ProtectedRoutes>
      //   ),
      // },
      // {
      //   path: "add-admin",
      //   element: (
      //     <ProtectedRoutes role="admin">
      //       <AddAdmin />
      //     </ProtectedRoutes>
      //   ),
      // },
    ],
  },
]);

export default router;
