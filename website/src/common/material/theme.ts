import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

export const getTheme = (prefersDarkMode: boolean) => {
  return createMuiTheme({
    palette: {
      type: prefersDarkMode ? "dark" : "light",

      primary: {
        main: "#fffcbb",
      },
      secondary: {
        main: "#ccc",
      },
    },
  });
};

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  table: {
    minWidth: 650,
  },
}));
