import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, ButtonBase, Collapse } from "@mui/material";
import React from "react";
import { dashboardItems } from "@/types/layout";
import { COLORS } from "@/assets/colors/layout";

export const SideNavItem = ({
  active,
  disabled,
  external,
  icon,
  path,
  title,
  children,
  onClick,
}: dashboardItems) => {
  const [open, setOpen] = React.useState(true);

  // ------------- functions --------------
  const handleClick = () => {
    setOpen(!open);
  };

  const linkProps = !path
    ? {}
    : path
    ? external
      ? {
          component: "a",
          to: path,
          target: "_blank",
        }
      : {
          component: Link,
          to: path,
        }
    : {};

  return (
    <li>
      <ButtonBase
        onClick={() => {
          handleClick();
          onClick && onClick();
        }}
        sx={{
          alignItems: "center",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "row",
          gap: 1,
          color: COLORS.sideBarTextColor,
          fontSize: 20,
          fontWeight: "bold",
          py: 2,
          ...(active && {
            backgroundColor: COLORS.sideBarItemActive,
          }),
          width: "250px",
          "&:hover": {
            bgcolor: COLORS.sideBarItemHover,
          },
        }}
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              ...(active && {
                color: "white",
              }),
            }}
          >
            {icon}
          </Box>
        )}
        {title}
      </ButtonBase>
      {children != undefined && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {children.map(
            (
              child: {
                path: string;
                active: boolean;
                icon: JSX.Element;
                title: string;
              },
              key: number
            ) => {
              const secondary_linkProps = child.path
                ? external
                  ? {
                      component: "a",
                      href: child.path,
                      target: "_blank",
                    }
                  : {
                      component: Link,
                      href: child.path,
                    }
                : {};
              return (
                <ButtonBase
                  key={key}
                  sx={{
                    alignItems: "center",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "flex-start",

                    py: "6px",
                    textAlign: "left",
                    width: "100%",
                    ...(child.active && {
                      backgroundColor: "primary.main",
                    }),
                    "&:hover": {},
                    ...(active && {
                      backgroundColor: "primary.main",
                    }),
                  }}
                  href="/clients"
                  {...secondary_linkProps}
                >
                  {icon && (
                    <Box
                      component="span"
                      sx={{
                        alignItems: "center",
                        color: "black",
                        display: "inline-flex",
                        justifyContent: "center",

                        ...(active && {
                          color: "white",
                        }),
                      }}
                    >
                      {child.icon}
                    </Box>
                  )}
                  <Box
                    component="span"
                    sx={{
                      color: "black",
                      flexGrow: 1,
                      fontFamily: (theme) => theme.typography.fontFamily,
                      fontSize: 14,
                      fontWeight: 600,
                      lineHeight: "24px",
                      whiteSpace: "nowrap",
                      ...(active && {
                        color: "white",
                      }),
                      ...(disabled && {
                        color: "grey.500",
                      }),
                    }}
                  >
                    {child.title}
                  </Box>
                </ButtonBase>
              );
            }
          )}
        </Collapse>
      )}
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
};
