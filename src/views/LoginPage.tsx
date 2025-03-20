import { useState, ChangeEventHandler, FormEventHandler } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      sx={{
        position: "absolute",
        border: "2px solid #000",
        minWidth: 400,
        top: "50%",
        left: "50%",
        bgcolor: "background.paper",
      }}
    >
      <form action="#" onSubmit={handleLoginSubmit}>
        <Typography variant="h4" component="h4">
          Login
        </Typography>
        <Box>
          <TextField
            label="Nome de Utilizador"
            type="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            label="Palavra-passe"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Box>
        <Button variant="contained" type="submit">
          Iniciar Sessão
        </Button>
      </form>
    </Box>
  );
}
