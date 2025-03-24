import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import "./css/index.css";
import LoginPage from "./views/LoginPage.tsx";
import AuthorsPage from "./views/AuthorsPage.tsx";
import NavBar from "./components/NavBar.tsx";
import { Box } from "@mui/material";

import secureLocalStorage from "react-secure-storage";

import Dashboard from "./views/Dashboard.tsx";
import RestrictedRoute from "./components/RestrictedRoute.tsx";

export default function App() {
  const initialLoginState =
    secureLocalStorage.getItem("jwt") !== "" &&
    secureLocalStorage.getItem("jwt") !== undefined &&
    secureLocalStorage.getItem("jwt") !== null;

  const [isLoggedIn, setIsLoggedIn] = useState(initialLoginState);

  const handleLogin = (success: boolean) => {
    setIsLoggedIn(success);
    alert(success);
    alert(isLoggedIn);
  };

  const handleLoginClick = () => {
    window.location.reload();
    return <Navigate to="/login" replace />;
  };

  const handleLogoutClick = () => {
    secureLocalStorage.setItem("jwt", "");
    window.location.reload();
    return <Navigate to="/login" replace />;
  };

  return (
    <>
      <NavBar
        isLoggedIn={isLoggedIn}
        onClickLogin={handleLoginClick}
        onClickLogout={handleLogoutClick}
      />
      <Box sx={{ marginTop: 10 }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <RestrictedRoute>
                  <Dashboard />
                </RestrictedRoute>
              }
            />
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} />}
            />
            <Route
              path="/authors"
              element={
                <RestrictedRoute>
                  <AuthorsPage />
                </RestrictedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
}
