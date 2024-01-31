import { Type_Nav_Items } from "@/types/layout";

export const NAV_ITEMS: Type_Nav_Items[] = [
  // icons code comes from the next link : https://icones.js.org/collection/all?s=home      "SVG formula"
  {
    name: "Restaurants",
    path: "/home",
    icon: "pi pi-home",
    role: "admin",
  },
  {
    name: "Categories",
    path: "/categories",
    icon: "pi pi-users",
    role: "user",
  },
  {
    name: "Products",
    path: "/products",
    icon: "pi pi-users",
    role: "all",
  },
  {
    name: "Categories",
    path: "/categories",
    icon: "pi pi-arrow-right-arrow-left",
  },
  {
    name: "Reports",
    path: "/reports",
    icon: "pi pi-file",
  },
  {
    name: "Settings",
    path: "/settings",
    icon: "pi pi-file",
    role: "all",
  },
];
