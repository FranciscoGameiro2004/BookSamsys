import { useState, ChangeEventHandler, FormEventHandler } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import  secureLocalStorage  from  "react-secure-storage";
import { useNavigate } from "react-router";

interface LoginPageProps {
  onLogin?: (success: boolean) => void
}

export default function LoginPage({onLogin = undefined}: LoginPageProps) {
  const apiURL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await fetch(apiURL + "login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          secureLocalStorage.setItem("jwt", json.token);
        });
        navigate("/")
        if (onLogin) {
          onLogin(true)
        }
    } catch (error) {
      console.error(error);
      secureLocalStorage.setItem("jwt", "");
      if (onLogin) {
        onLogin(false)
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.paper",
        height: "100%",
        maxHeight:900,
        width: "100%",
      }}
    >
      <Box>
        <form action="#" onSubmit={handleLoginSubmit}>
          <Typography variant="h4" component="h4" sx={{m: 1}}>
            Login
          </Typography>
          <Box sx={{display: 'flex', flexDirection:'column', top: '50%'}}>
            <TextField
              sx={{m: 1}}
              label="Nome de Utilizador"
              type="username"
              value={username}
              onChange={handleUsernameChange}
            />
            <TextField
              sx={{m: 1}}
              label="Palavra-passe"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Box>
          <Button variant="contained" type="submit" sx={{m: 1}}>
            Iniciar Sessão
          </Button>
        </form>
      </Box>
    </Box>
  );
}
