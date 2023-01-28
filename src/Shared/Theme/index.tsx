import { createTheme, responsiveFontSizes } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true
  }
}

let lightTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1000,
      xl: 1200,
      xxl: 1536
    },
  },
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1000,
      xl: 1200,
      xxl: 1536,
    },
  },
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
