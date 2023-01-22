import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let lightTheme = createTheme({
  palette: {
    primary: {
      main: "#2e2e2e"
    },
    secondary: {
      main: "#FFFEF9"
    }
  },
  typography: {
    fontFamily: [
      "Roboto",
      "sans-serif"
    ].join(",")
  }
});

let darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFFEF9"
    },
    secondary: {
      main: "#939393"
    }
  },
  typography: {
    fontFamily: [
      "Roboto",
      "sans-serif"
    ].join(",")
  }
})

lightTheme = responsiveFontSizes(lightTheme);
darkTheme = responsiveFontSizes(darkTheme);


const themes = {
  lightTheme,
  darkTheme
}

export default themes
