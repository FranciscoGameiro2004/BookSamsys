import {
  useState,
  useEffect,
  ChangeEventHandler,
  FormEventHandler,
  SyntheticEvent,
} from "react";
import "../css/Dashboard.css";

import type { ChangeEvent } from "react";

import { type Book } from "../types/books";
import { type SelectChangeEvent } from "@mui/material";

import BookResults from "../components/views/dashboard/BookResults";
import BookSearch from "../components/views/dashboard/BookSearch";

import { Add } from "@mui/icons-material";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";

function Dashboard() {
  const apiURL = import.meta.env.VITE_API_BASE_URL;

  const bookCategories = [
    "Fantasy",
    "Science Fiction",
    "Comic",
    "Poetry",
    "Children's Literature",
    "Adventure",
    "Psychology",
    "Business",
    "Classic",
    "Romance",
    "Comedy",
    "Thriller",
    "Historical Fiction",
    "Western",
    "Religion",
    "Mythology",
    "Philosophy",
    "Biography",
  ];

  const [booksList, setBooksList] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [quantityPerPage, setQuantityPerPage] = useState(15);

  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [orderAndSort, setOrderAndSort] = useState("");

  const [genreFilter, setGenreFilter] = useState("");

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [uriPriceRange, setURIPriceRange] = useState(
    `&price_gte=${priceRange[0]}&price_lte=${priceRange[1]}`
  );
  const [minRating, setMinRating] = useState(1);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const [openAddEditBookModal, setOpenAddEditBookModal] = useState(false);
  const [addEditModalAction, setAddEditModalAction] = useState<"add" | "edit">(
    "add"
  );
  const [editBookInfo, setEditBookInfo] = useState<Book>();

  const [newEditBookName, setNewEditBookName] = useState("");
  const [newEditBookAuthor, setNewEditBookAuthor] = useState("");
  const [newEditBookGenre, setNewEditBookGenre] = useState("");
  const [newEditBookPublisher, setNewEditBookPublisher] = useState("");
  const [newEditBookISBN, setNewEditBookISBN] = useState("");
  const [newEditBookPrice, setNewEditBookPrice] = useState("");
  const [newEditBookRating, setNewEditBookRating] = useState(1);
  const [newEditBookAvailable, setNewEditBookAvailable] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, [page, quantityPerPage]);

  useEffect(() => {
    if (orderBy !== "" && sortBy !== "") {
      setOrderAndSort(`&sort=${sortBy}&order=${orderBy}`);
    } else if (sortBy !== "") {
      setOrderAndSort(`&sort=${sortBy}`);
    } else {
      setOrderAndSort("");
    }
  }, [orderBy, sortBy]);

  useEffect(() => {
    setURIPriceRange(`&price_gte=${priceRange[0]}&price_lte=${priceRange[1]}`);
  }, [priceRange]);

  useEffect(() => {
    if (openAddEditBookModal) {
      if (addEditModalAction === "add") {
        setNewEditBookISBN("");
        setNewEditBookName("");
        setNewEditBookAuthor("");
        setNewEditBookPublisher("");
        setNewEditBookGenre("");
        setNewEditBookPrice("");
        setNewEditBookRating(0);
        setNewEditBookAvailable(false);
      } else if (addEditModalAction === "edit") {
        if (editBookInfo !== undefined) {
          console.log(editBookInfo.uuid)
          setNewEditBookISBN(editBookInfo.isbn);
          setNewEditBookName(editBookInfo.title);
          setNewEditBookAuthor(editBookInfo.author);
          setNewEditBookPublisher(editBookInfo.publisher);
          setNewEditBookGenre(editBookInfo.genre);
          setNewEditBookPrice(`${editBookInfo.price}`);
          setNewEditBookRating(editBookInfo.rating);
          setNewEditBookAvailable(editBookInfo.available);
        }
      }
    }
  }, [openAddEditBookModal, addEditModalAction]);

  const fetchBooks = async (): Promise<void> => {
    setLoading(true);
    fetch(
      apiURL +
        "books" +
        `?page=${page}` +
        `&limit=${quantityPerPage}` +
        `&search=${search}` +
        orderAndSort +
        genreFilter +
        uriPriceRange +
        `&rating_gte=${minRating}` +
        (onlyAvailable ? `&available_eq=${onlyAvailable}` : "")
    )
      .then((res) => res.json())
      .then((json) => {
        setBooksList(json);
        console.log(json);
      });
    setLoading(false);
  };

  const handleClickPage = (input: "next" | "previous"): void => {
    if (input === "next") {
      setPage((previousPage) => previousPage + 1);
    } else if (input === "previous") {
      setPage((previousPage) => previousPage - 1);
    }
  };

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setPage(1);
    await fetchBooks();
  };

  const handleSortChange = (e: SelectChangeEvent<string>) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (
    e: ChangeEvent<HTMLInputElement>,
    input: string
  ) => {
    setOrderBy(input);
  };

  const handleGenreFilterChange = (e: SelectChangeEvent<string>) => {
    setGenreFilter(e.target.value);
  };

  const handlePriceRangeChange = (e: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleMinRatingChange = (
    e: SyntheticEvent,
    newValue: number | null
  ) => {
    if (typeof newValue === "number") {
      setMinRating(newValue);
    }
  };

  const handleOnlyAvailableChange: ChangeEventHandler<
    HTMLInputElement
  > = () => {
    setOnlyAvailable((previousValue) => !previousValue);
  };

  const handleOpenAddBookModal = () => {
    setAddEditModalAction("add");
    setOpenAddEditBookModal(true);
  };

  const handleOpenEditBookModal = (bookToEdit: Book) => {
    setEditBookInfo(bookToEdit);
    setAddEditModalAction("edit");
    setOpenAddEditBookModal(true);    
  };

  const handleCloseAddBookModal = () => setOpenAddEditBookModal(false);

  const handleNewEditBookNameChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setNewEditBookName(e.target.value);
  };

  const handleNewEditBookAuthorChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setNewEditBookAuthor(e.target.value);
  };

  const handleNewEditBookGenreChange = (e: SelectChangeEvent<string>) => {
    setNewEditBookGenre(e.target.value);
  };

  const handleNewEditBookPublisherChange: ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    setNewEditBookPublisher(e.target.value);
  };

  const handleNewEditBookISBNChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setNewEditBookISBN(e.target.value);
  };

  const handleNewEditBookPriceChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setNewEditBookPrice(e.target.value);
  };

  const handleNewEditBookRatingChange = (
    e: SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    if (typeof value === "number") {
      setNewEditBookRating(value);
    }
  };

  const handleNewEditBookAvailableChange: ChangeEventHandler<
    HTMLInputElement
  > = () => {
    setOnlyAvailable((previousValue) => !previousValue);
  };

  const handleAddEditBookSubmit: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      let response: Response;
      console.log(newEditBookGenre);
      if (addEditModalAction === "add") {
        response = await fetch(apiURL + "books", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            "isbn": newEditBookISBN,
            "title": newEditBookName,
            "author": newEditBookAuthor,
            "publisher": newEditBookPublisher,
            "genre": newEditBookGenre,
            "price": +newEditBookPrice,
            "rating": +newEditBookRating,
            "available": newEditBookAvailable,
          }),
        });
        console.log(response);
      } else if (addEditModalAction === "edit") {
        if (editBookInfo !== undefined) {          
          const response = await fetch(apiURL + "books/" + editBookInfo.uuid, {
            method: "PATCH",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              "isbn": newEditBookISBN,
              "title": newEditBookName,
              "author": newEditBookAuthor,
              "publisher": newEditBookPublisher,
              "genre": newEditBookGenre,
              "price": +newEditBookPrice,
              "rating": +newEditBookRating,
              "available": newEditBookAvailable,
            }),
          });
          console.log(response);
        }
      }
      setOpenAddEditBookModal(false)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboardContainer">
      <div className="addBtnContainer">
        <Button
          sx={{
            width: 60,
            height: 60,
            borderRadius: 100,
            backgroundColor: "red",
            m: 8,
          }}
          variant="contained"
          onClick={handleOpenAddBookModal}
        >
          <Add />
        </Button>
      </div>
      <h1>Livros</h1>
      <BookSearch
        search={search}
        orderBy={orderBy}
        sortBy={sortBy}
        genreFilter={genreFilter}
        priceRange={priceRange}
        minRating={minRating}
        onlyAvailable={onlyAvailable}
        genreList={bookCategories}
        onFormSubmit={handleFormSubmit}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        onOrderChange={handleOrderChange}
        onGenreFilterChange={handleGenreFilterChange}
        onPriceRangeChange={handlePriceRangeChange}
        onMinRatingChange={handleMinRatingChange}
        onOnlyAvailableChange={handleOnlyAvailableChange}
      />
      <hr />
      <BookResults
        booksList={booksList}
        page={page}
        quantityPerPage={quantityPerPage}
        onClickPage={handleClickPage}
        onClickEditBook={handleOpenEditBookModal}
      />
      <Modal open={openAddEditBookModal} onClose={handleCloseAddBookModal}>
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
          <Typography id="modal-modal-title" variant="h3" component="h3">
            {addEditModalAction === "add" ? "Adicionar Livro" : "Editar Livro"}
          </Typography>
          <form action="#" onSubmit={handleAddEditBookSubmit}>
            <TextField
              required
              label="Título"
              sx={{ width: "100%", m: 1 }}
              value={newEditBookName}
              onChange={handleNewEditBookNameChange}
            ></TextField>
            <TextField
              required
              label="Autor"
              sx={{ width: "100%", m: 1 }}
              value={newEditBookAuthor}
              onChange={handleNewEditBookAuthorChange}
            ></TextField>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel id="genreLabel">Gênero</InputLabel>
              <Select
                labelId="genreLabel"
                label="Gênero"
                name="genreFilter"
                id="genreFilter"
                value={newEditBookGenre}
                onChange={handleNewEditBookGenreChange}
                required
              >
                <MenuItem value="">Todos</MenuItem>
                {bookCategories.map((genre, idx) => (
                  <MenuItem key={idx} value={`${genre}`}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              required
              label="Editora"
              sx={{ width: "100%", m: 1 }}
              value={newEditBookPublisher}
              onChange={handleNewEditBookPublisherChange}
            ></TextField>
            <TextField
              required
              label="ISBN"
              sx={{ width: "100%", m: 1 }}
              value={newEditBookISBN}
              onChange={handleNewEditBookISBNChange}
            ></TextField>
            <TextField
              required
              type="number"
              label="Preço (€)"
              sx={{ width: "100%", m: 1 }}
              value={newEditBookPrice}
              onChange={handleNewEditBookPriceChange}
            ></TextField>
            <Box sx={{ width: "100%", m: 1 }}>
              <Typography>Avaliação</Typography>
              <Rating
                value={newEditBookRating}
                onChange={handleNewEditBookRatingChange}
              />
            </Box>
            <FormControlLabel
              sx={{ width: "100%", m: 1 }}
              value={newEditBookAvailable}
              control={<Checkbox onChange={handleNewEditBookAvailableChange} />}
              label="Livro em stock?"
            />
            <div>
              <Button variant="contained" type="submit">
                {addEditModalAction === "add"
                  ? "Adicionar"
                  : "Aplicar Alterações"}
              </Button>
              <Button variant="outlined">Cancelar</Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Dashboard;
