import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";

interface NavBarProps {
  isLoggedIn: boolean;
  onClickLogin: () => void;
  onClickLogout: () => void;
  onClickBooks: () => void;
  onClickAuthors: () => void;
}

export default function NavBar({
  isLoggedIn,
  onClickLogin,
  onClickLogout,
  onClickBooks,
  onClickAuthors,
}: NavBarProps) {
  const handleClickLogin = () => {
    onClickLogin();
  };
  const handleClickLogout = () => {
    onClickLogout();
  };

  const handleClickBooks = () => {
    onClickBooks();
  };

  const handleClickAuthors = () => {
    onClickAuthors();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BookSamsys
          </Typography>
          {isLoggedIn ? (
            <>
              <Button
                onClick={handleClickBooks}
                sx={{ color: "white" }}
                variant="text"
              >
                Livros
              </Button>
              <Button
                onClick={handleClickAuthors}
                sx={{ color: "white" }}
                variant="text"
              >
                Autores
              </Button>
              <Button
                onClick={handleClickLogout}
                sx={{ color: "white" }}
                variant="text"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              onClick={handleClickLogin}
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
