import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Define paths where the navbar should not be shown
  const hideNavbarPaths = ["/login", "/register", "/forgot-password"];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        {/* Conditionally render the Navbar */}
        {!hideNavbarPaths.includes(router.pathname) && <Navbar />}
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
