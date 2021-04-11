import React from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";

import SettingsIcon from "@material-ui/icons/Settings";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";

import { useHistory } from "react-router-dom";

import { useStyles } from "./styles";

type renderTopBarRight = (props: {
  handleClick: () => void;
}) => React.ReactElement;
export const NavBar: React.FC<{
  title: string;
  leftPages: { name: string; route: string; icon: React.ReactNode }[];
  renderTopBarRight?: renderTopBarRight;
}> = ({ title, leftPages, renderTopBarRight, children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSettingsOpen = () => {
    console.log("open");
  };

  const handleClick = (route: string = "") => () => {
    // event.preventDefault();
    // console.log('Going to:', route)
    history.push(route);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          {/* whatever is on the left side */}
          <Box display="flex" flexGrow={1}>
            <Typography variant="h6" noWrap>
              {title}
            </Typography>
          </Box>
          {/* whatever is on the right side */}
          {renderTopBarRight &&
            renderTopBarRight({ handleClick: handleSettingsOpen })}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {leftPages.map(({ name, icon, route }) => {
            const DefaultIcon = () => <div>?</div>;
            const Icon = icon || DefaultIcon;
            return (
              <ListItem button key={name} onClick={handleClick(route)}>
                <ListItemIcon>
                  {/* @ts-expect-error bad icon type */}
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <List>
          {["Settings"].map((text) => (
            <ListItem button key={text} onClick={handleClick(text)}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
};
