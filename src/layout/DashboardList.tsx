import { SvgIcon } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { dashboardItems } from "@/types/layout";

export const items: dashboardItems[] = [
  {
    external: false,
    disabled: false,
    menu: false,
    title: "Dashboard",
    path: "/dashboard",
    module: "dashboard",
    icon: (
      <SvgIcon fontSize="small">
        <HomeIcon />
      </SvgIcon>
    ),
  },
];
