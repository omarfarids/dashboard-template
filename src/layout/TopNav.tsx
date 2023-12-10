import PropTypes from "prop-types";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import { usePopover } from "@/hooks/usePopover";
import { AccountPopover } from "./AccountPopover";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Searchbar from "@/components/Searchbar";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import AppsIcon from "@mui/icons-material/Apps";

// ---------- constants -----------
const SIDE_NAV_WIDTH = "100%";
const TOP_NAV_HEIGHT = 64;

export const TopNav = ({ onNavOpen }: { onNavOpen: () => void }) => {
  // ------------ hooks --------------

  const accountPopover = usePopover();

  return (
    <>
      <Box
        component="header"
        sx={{
          backgroundColor: "#FFFFFF",
          position: "sticky",
          border: "1px solid #091E4224",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: 3,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            <Tooltip title="Logo">
              <>
                <Link to="/dashboard">
                  <Box
                    sx={{
                      display: {
                        xs: "none",
                        lg: "block",
                      },
                    }}
                  >
                    <p>LOGO</p>
                  </Box>
                </Link>
                <Box
                  sx={{
                    display: {
                      xs: "block",
                      lg: "none",
                    },
                    cursor: "pointer",
                  }}
                  onClick={onNavOpen}
                >
                  <AppsIcon />
                </Box>
              </>
            </Tooltip>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Tooltip title="Search">
              <Searchbar />
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton>
                <Badge badgeContent={4} color="success" variant="dot">
                  <SvgIcon fontSize="small">
                    <NotificationsNoneIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="User">
              <>
                <Avatar
                  onClick={accountPopover.handleOpen}
                  ref={accountPopover.anchorRef}
                  sx={{
                    cursor: "pointer",
                    height: 40,
                    width: 40,
                  }}
                  src="/assets/avatars/avatar-anika-visser.png"
                />
                <Typography variant="body1">
                  {Cookies.get("username")}
                </Typography>
              </>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
