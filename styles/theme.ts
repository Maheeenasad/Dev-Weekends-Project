import { createTheme } from "@mui/material/styles";

// Create a theme and set the default typography and button styles
const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', 'Alata', sans-serif",
    h4: {
      fontFamily: "'Alata', sans-serif",
    },
    body1: {
      fontFamily: "'Poppins', sans-serif",
    },
    body2: {
      fontFamily: "'Poppins', sans-serif",
    },
  },
  // Override default Material UI components
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#000",
          color: "#fff",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#333",
          },
        },
      },
    },
  },
});

export default theme;
