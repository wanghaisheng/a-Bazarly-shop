import { Home, Receipt } from "lucide-react";

export const AdminSidebarMenus = [
  {
    title: "Home",
    path: "",
    icon: <Home size={20} />,
  },
];

export const VendorSidebarMenus = [
  {
    title: "",
    path: "",
    icon: <Home size={20} />,
  },
];

export const CustomerSidebarMenus = [
  {
    title: "My Orders",
    path: "/dashboard/my-orders",
    icon: <Receipt size={20} />,
  }
];
