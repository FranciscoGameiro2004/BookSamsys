import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  TextField,
  Fab,
  Modal,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Skeleton,
} from "@mui/material";
import { Edit, Delete, Add, RestartAlt, PersonOff } from "@mui/icons-material";

import type { Author } from "../types/authors";

import {
  useEffect,
  useState,
  FormEventHandler,
  ChangeEventHandler,
  ChangeEvent,
} from "react";

function EmptyState() {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <PersonOff sx={{ width: 250, height: 250 }} />
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <Typography variant="h6" component="p">
          Não foram encontrados autores.
        </Typography>
        <Typography component="p">Procure criá-lo.</Typography>
      </Box>
    </Box>
  );
}

export default function AuthorsPage() {
  const apiURL = import.meta.env.VITE_API_BASE_URL;

  const [authorsList, setAuthorsList] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [orderBy, setOrderBy] = useState("");
  const [orderByQuery, setOrderByQuery] = useState("");

  const [selectedAuthor, setSelectedAuthor] = useState<Author>();

  const [openAddEditAuthorModal, setOpenAddEditAuthorModal] = useState(false);
  const [openDeleteAuthorModal, setOpenDeleteAuthorModal] = useState(false);

  const [addEditAuthor, setAddEditAuthor] = useState("");
  const [addEditModalAction, setAddEditModalAction] = useState<"add" | "edit">(
    "add"
  );

  const fetchAuthors = async (): Promise<void> => {
    setLoading(true);
    await fetch(apiURL + "authors" + searchQuery + orderByQuery)
      .then((res) => res.json())
      .then((json) => {
        setAuthorsList(json);
        console.log(json);
      });
    setLoading(false);
  };

  const handleOpenDeleteAuthorModal = (author: Author) => {
    setSelectedAuthor(author);
    setOpenDeleteAuthorModal(true);
  };

  const handleCloseDeleteAuthorModal = () => {
    setOpenDeleteAuthorModal(false);
  };

  const handleOpenAddAuthorModal = () => {
    setAddEditModalAction("add");
    setAddEditAuthor("");
    setOpenAddEditAuthorModal(true);
  };

  const handleOpenEditAuthorModal = (author: Author) => {
    setAddEditModalAction("edit");
    setSelectedAuthor(author);
    setOpenAddEditAuthorModal(true);
  };

  const handleCloseAddEditAuthorModal = () => {
    setOpenAddEditAuthorModal(false);
  };

  const handleAddEditAuthorNameEdit: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setAddEditAuthor(e.target.value);
  };

  const handleDeleteAuthorSubmit: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      await fetch(apiURL + "authors/" + selectedAuthor?.uuid, {
        method: "DELETE",
      });
      setOpenDeleteAuthorModal(false);
      await fetchAuthors();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddEditAuthorSubmit: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (addEditModalAction === "add") {
      try {
        await fetch(apiURL + "authors", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            author: addEditAuthor,
          }),
        });
        setOpenAddEditAuthorModal(false);
        await fetchAuthors();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await fetch(apiURL + "authors/" + selectedAuthor?.uuid, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            author: addEditAuthor,
          }),
        });
        setOpenAddEditAuthorModal(false);
        await fetchAuthors();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };

  const handleOrderChange = (
    e: ChangeEvent<HTMLInputElement>,
    input: string
  ) => {
    setOrderBy(input);
  };

  const handleResetFilterClick = () => {
    setOrderBy("");
  };

  useEffect(() => {
    fetchAuthors();
  }, [searchQuery, orderByQuery]);

  useEffect(() => {
    setSearchQuery(`?search=${search}`);
  }, [search]);

  useEffect(() => {
    if (selectedAuthor !== undefined) {
      setAddEditAuthor(selectedAuthor?.author);
    }
  }, [selectedAuthor]);

  useEffect(() => {
    if (orderBy !== "") {
      setOrderByQuery(`&order=${orderBy}&sort=author`);
    } else {
      setOrderByQuery("");
    }
  }, [orderBy]);

  return (
    <>
      <Box>
        <Fab
          sx={{
            position: "fixed",
            bottom: 40,
            right: 40,
            color: "white",
            backgroundColor: "blueviolet",
          }}
          onClick={handleOpenAddAuthorModal}
        >
          <Add />
        </Fab>
      </Box>
      <h1>Autores</h1>
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <TextField
          sx={{ width: "100%", maxWidth: 500 }}
          label="Pesquisa"
          value={search}
          onChange={handleSearchChange}
        />
        <FormControl className="orderItem">
          <FormLabel id="orderByLabel">Por ordem</FormLabel>
          <RadioGroup
            value={orderBy}
            sx={{ display: "flex", flexDirection: "row" }}
            onChange={handleOrderChange}
          >
            <FormControlLabel
              value="asc"
              control={<Radio />}
              label="Crescente"
            />
            <FormControlLabel
              value="desc"
              control={<Radio />}
              label="Derescente"
            />
            <Button onClick={handleResetFilterClick}>
              <RestartAlt />
            </Button>
          </RadioGroup>
        </FormControl>
        {authorsList.length > 0 || loading ? (
          <List
            sx={{
              width: "100%",
              height: "100%",
              maxWidth: 500,
              maxHeight: 750,
              bgcolor: "background.paper",
              overflowY: "scroll",
            }}
          >
            {!loading
              ? authorsList.map((author) => (
                  <ListItem
                    key={author.uuid}
                    disableGutters
                    secondaryAction={
                      <>
                        <IconButton
                          onClick={() => handleOpenEditAuthorModal(author)}
                          aria-label="editar"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleOpenDeleteAuthorModal(author)}
                          aria-label="apagar"
                        >
                          <Delete />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText primary={author.author} />
                  </ListItem>
                ))
              : [...Array(15)].map((el, idx) => (
                  <ListItem
                    key={idx}
                    disableGutters
                    secondaryAction={
                      <>
                        <IconButton disabled>
                          <Edit />
                        </IconButton>
                        <IconButton disabled>
                          <Delete />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText primary={<Skeleton width={"90%"} />} />
                  </ListItem>
                ))}
          </List>
        ) : (
          <EmptyState />
        )}
      </Box>
      <Modal
        open={openDeleteAuthorModal}
        onClose={handleCloseDeleteAuthorModal}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Apagar autor?
          </Typography>
          <Typography id="modal-modal-body" component="p">
            Pretende realmente apagar o autor {selectedAuthor?.author}?
          </Typography>
          <form action="#" onSubmit={handleDeleteAuthorSubmit}>
            <div>
              <Button variant="contained" type="submit">
                Apagar
              </Button>
              <Button variant="outlined">Cancelar</Button>
            </div>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openAddEditAuthorModal}
        onClose={handleCloseAddEditAuthorModal}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Adicionar autor
          </Typography>
          <TextField
            label="Nome do autor"
            sx={{ width: "100%" }}
            value={addEditAuthor}
            onChange={handleAddEditAuthorNameEdit}
          />
          <form action="#" onSubmit={handleAddEditAuthorSubmit}>
            <div>
              <Button variant="contained" type="submit">
                {addEditModalAction === "add"
                  ? "Adicionar"
                  : "Confirmar Alterações"}
              </Button>
              <Button variant="outlined">Cancelar</Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
