/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import User from "./Pages/User";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000", // Change this to your desired primary color
    },
    secondary: {
      main: "#d3d3d3", // Change this to your desired secondary color
    },
    error: {
      main: "#f44336", // Change this to your desired error color
    },
    background: {
      default: "#fff", // Change this to your desired background color
    },
  },
});

const App = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <ThemeProvider theme={theme}>
      <div>
        {path !== "/user" && <Navbar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};
export default App;
