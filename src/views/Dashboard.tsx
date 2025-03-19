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

  const [openAddBookModal, setOpenAddBookModal] = useState(false);

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

  const handleOpenAddBookModal = () => setOpenAddBookModal(true);
  const handleCloseAddBookModal = () => setOpenAddBookModal(false);

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
        handleClickPage={handleClickPage}
      />
      <Modal open={openAddBookModal} onClose={handleCloseAddBookModal}>
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Adicionar Livro
          </Typography>
          <form action="">
            <TextField
              required
              label="Título"
              sx={{ width: "100%", m: 1 }}
            ></TextField>
            <TextField
              required
              label="Autor"
              sx={{ width: "100%", m: 1 }}
            ></TextField>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel id="genreLabel">Gênero</InputLabel>
              <Select
                labelId="genreLabel"
                label="Gênero"
                name="genreFilter"
                id="genreFilter"
                value={""}
                required
              >
                <MenuItem value="">Todos</MenuItem>
                {bookCategories.map((genre) => (
                  <MenuItem value={`&genre_eq=${genre}`}>{genre}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              required
              label="Editora"
              sx={{ width: "100%", m: 1 }}
            ></TextField>
            <TextField
              required
              label="ISBN"
              sx={{ width: "100%", m: 1 }}
            ></TextField>
            <TextField
              required
              label="Editora"
              sx={{ width: "100%", m: 1 }}
            ></TextField>
            <TextField
              required
              type="number"
              label="Preço (€)"
              sx={{ width: "100%", m: 1 }}
            ></TextField>
            <Box sx={{ width: "100%", m: 1 }}>
              <Typography>Avaliação</Typography>
              <Rating value={1} onChange={() => {}} />
            </Box>
            <FormControlLabel
              sx={{ width: "100%", m: 1 }}
              control={
                <Checkbox />
              }
              label="Livro em stock?"
            />
            <div>
              <Button variant="contained" type="submit">
                Adicionar
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
