import PropTypes from "prop-types";
import { Box, Drawer, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { items } from "./DashboardList";
import { SideNavItem } from "./SideNavItem";
import { useTheme } from "@mui/material/styles";
import { dashboardItems } from "@/types/layout";
import { COLORS } from "@/assets/colors/layout";

export const SideNav = (props: { open: boolean; onClose: () => void }) => {
  // ----------- hooks -------------
  const { open, onClose } = props;
  const theme = useTheme();
  const lgUp: boolean = useMediaQuery(theme.breakpoints.up("lg"));

  // ------------ functions ---------------

  // ------------- side effects ---------------

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        component="nav"
        sx={{
          flexGrow: 1,
          px: "5px",
          py: 3,
          pt: 12,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Stack
          component="ul"
          spacing={0.5}
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {items.map((item: dashboardItems) => {
            const active =
              window.location.pathname.split("/")[1] === item.module
                ? true
                : false;

            return (
              <SideNavItem
                active={active}
                disabled={item.disabled}
                external={item.external}
                icon={item.icon}
                key={item.title}
                path={item.path}
                title={item.title}
                children={item.children}
                module={"dashboard"}
              />
            );
          })}
        </Stack>
      </Box>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: COLORS.sideBarBackgroundColor,
            color: "black",
            width: 300,
            border: "none",

            zIndex: 2,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "white",
          color: "black",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
