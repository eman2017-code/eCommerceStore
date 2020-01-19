import {
  Home,
  Box,
  DollarSign,
  Tag,
  Clipboard,
  Camera,
  AlignLeft,
  UserPlus,
  Users,
  Chrome,
  BarChart,
  Settings,
  Archive,
  LogIn
} from "react-feather";

export const MENUITEMS = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: Home,
    type: "link",
    badgeType: "primary",
    active: false
  },
  {
    title: "Products",
    icon: Box,
    type: "sub",
    active: false,
    children: [
      {
        path: "/products/physical/category",
        title: "Categories",
        type: "link"
      },
      {
        path: "/products/physical/product-list",
        title: "Product List",
        type: "link"
      },
      {
        path: "/products/physical/add-product",
        title: "Add Product",
        type: "link"
      }
    ]
  },
  {
    title: "Coupons",
    icon: Tag,
    type: "sub",
    active: false,
    children: [
      { path: "/coupons/list-coupons", title: "List Coupons", type: "link" },
      { path: "/coupons/create-coupons", title: "Create Coupons", type: "link" }
    ]
  },
  {
    title: "Customers",
    icon: UserPlus,
    type: "sub",
    active: false,
    children: [
      { path: "/users/list-user", title: "Customer List", type: "link" }
    ]
  },
  {
    title: "Vendors",
    icon: Users,
    type: "sub",
    active: false,
    children: [
      { path: "/vendors/list_vendors", title: "Vendor List", type: "link" },
      { path: "/vendors/create-vendors", title: "Create Vendor", type: "link" }
    ]
  },
  {
    title: "Localization",
    icon: Chrome,
    type: "sub",
    children: [
      {
        path: "/localization/transactions",
        title: "Translations",
        type: "link"
      },
      {
        path: "/localization/currency-rates",
        title: "Currency Rates",
        type: "link"
      },
      { path: "/localization/taxes", title: "Taxes", type: "link" }
    ]
  },
  {
    title: "Reports",
    path: "/reports/report",
    icon: BarChart,
    type: "link",
    active: false
  },
  {
    title: "Settings",
    icon: Settings,
    type: "sub",
    children: [{ path: "/settings/profile", title: "Profile", type: "link" }]
  },
  {
    title: "Invoice",
    path: "/invoice",
    icon: Archive,
    type: "link",
    active: false
  },
  {
    title: "Login",
    path: "/auth/login",
    icon: LogIn,
    type: "link",
    active: false
  }
];
