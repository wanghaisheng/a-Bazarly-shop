import {
  CircleDollarSign,
  Receipt,
  ShoppingCart,
  Star,
  Store,
  Tags,
  Users,
  UsersRound,
} from "lucide-react";

export const AdminSidebarMenus = [
  {
    title: "Customers",
    path: "/dashboard/customers",
    icon: <UsersRound size={20} />,
  },
  {
    title: "Vendors",
    path: "/dashboard/vendors",
    icon: <Users size={20} />,
  },
  {
    title: "Shops",
    path: "/dashboard/shops",
    icon: <Store size={20} />,
  },
  {
    title: "Categories",
    path: "/dashboard/categories",
    icon: <Tags size={20} />,
  },
  {
    title: "Reviews",
    path: "/dashboard/reviews",
    icon: <Star size={20} />,
  },
  {
    title: "Payments",
    path: "/dashboard/payments",
    icon: <CircleDollarSign size={20} />,
  },
];

export const VendorSidebarMenus = [
  {
    title: "My Shops",
    path: "/dashboard/my-shops",
    icon: <Store size={20} />,
  },
  {
    title: "Orders",
    path: "/dashboard/orders",
    icon: <Receipt size={20} />,
  },
  {
    title: "Products",
    path: "/dashboard/shop-products",
    icon: <ShoppingCart size={20} />,
  },
  {
    title: "Reviews",
    path: "/dashboard/shop-reviews",
    icon: <Star size={20} />,
  },
];

export const CustomerSidebarMenus = [
  {
    title: "My Orders",
    path: "/dashboard/my-orders",
    icon: <Receipt size={20} />,
  },
];
