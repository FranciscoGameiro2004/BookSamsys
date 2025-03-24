import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  TextField,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import type { Author } from "../types/authors";

import { useEffect, useState } from "react";

export default function AuthorsPage() {
  const apiURL = import.meta.env.VITE_API_BASE_URL;

  const [authorsList, setAuthorsList] = useState<Author[]>([]);

  const fetchAuthors = async (): Promise<void> => {
    fetch(apiURL + "authors")
      .then((res) => res.json())
      .then((json) => {
        setAuthorsList(json);
        console.log(json);
      });
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <>
      <h1>Autores</h1>
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <TextField sx={{ width: "100%", maxWidth: 500 }} label="Pesquisa" />
        <List
          sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}
        >
          {authorsList.map((author) => (
            <ListItem
              key={author.uuid}
              disableGutters
              secondaryAction={
                <>
                  <IconButton aria-label="editar">
                  <Edit />
                  </IconButton>
                  <IconButton aria-label="apagar">
                  <Delete />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={author.author} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}
