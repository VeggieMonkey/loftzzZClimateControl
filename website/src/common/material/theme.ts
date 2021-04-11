import { createMuiTheme } from "@material-ui/core/styles";

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
