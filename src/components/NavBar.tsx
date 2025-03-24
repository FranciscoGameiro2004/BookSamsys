import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { useState } from "react";

interface NavBarProps {
  isLoggedIn: boolean;
  onClickLogin: () => void;
  onClickLogout: () => void;
}

export default function NavBar({ isLoggedIn, onClickLogin, onClickLogout }: NavBarProps) {
    const handleClickLogin = () => {
        onClickLogin()
    }
    const handleClickLogout = () => {
        onClickLogout()
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BookSamsys
          </Typography>
          {isLoggedIn ? (
            <Button onClick={handleClickLogout} sx={{ color: "white" }} variant="text">
              Logout
            </Button>
          ) : (
            <Button onClick={handleClickLogin}
              sx={{ backgroundColor: "white", color: "blue" }}
              variant="contained"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
