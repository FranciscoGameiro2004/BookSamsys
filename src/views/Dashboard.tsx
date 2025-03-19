import {
  useState,
  useEffect,
  ChangeEventHandler,
  FormEventHandler,
  SyntheticEvent
} from "react";
import "../css/Dashboard.css";

import type { ChangeEvent } from "react";

import { type Book } from "../types/books";
import { type SelectChangeEvent } from "@mui/material";

import {
  Button,
  IconButton,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { TextField } from "@mui/material";
import { Select, MenuItem, InputLabel } from "@mui/material";
import { Radio, RadioGroup } from "@mui/material";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import { Box, Slider, Typography, Rating } from "@mui/material";
import { Paper } from "@mui/material";

function Dashboard() {
  const apiURL = import.meta.env.VITE_API_BASE_URL;

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

  const handlePriceRangeChange = (e, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleMinRatingChange = (e: SyntheticEvent, newValue: number | null) => {
    if (typeof newValue === 'number') {
      setMinRating(newValue);
    }
  };

  const handleOnlyAvailableChange: ChangeEventHandler<
    HTMLInputElement
  > = () => {
    setOnlyAvailable((previousValue) => !previousValue);
  };

  return (
    <>
      <h1>Livros</h1>
      <div>
        <form action="#" onSubmit={handleFormSubmit}>
          <TextField
            value={search}
            label="Pesquisar"
            id="search"
            onChange={handleSearchChange}
          />
          <div>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="sortByLabel">Ordenar por</InputLabel>
              <Select
                label="Ordenar por"
                labelId="sortByLabel"
                name="sortBy"
                id="sortBy"
                value={sortBy}
                onChange={handleSortChange}
              >
                <MenuItem value="">Nenhum</MenuItem>
                <MenuItem value="title">Nome</MenuItem>
                <MenuItem value="author">Autor</MenuItem>
                <MenuItem value="price">Preço</MenuItem>
                <MenuItem value="rating">Avaliação</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl>
              <FormLabel id="orderByLabel">Por ordem</FormLabel>
              <RadioGroup value={orderBy} onChange={handleOrderChange}>
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
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <label htmlFor="">Filtros</label>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel id="genreLabel">Gênero</InputLabel>
              <Select
                labelId="genreLabel"
                label="Gênero"
                name="genreFilter"
                id="genreFilter"
                value={genreFilter}
                onChange={handleGenreFilterChange}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="&genre_eq=Fantasy">Fantasy</MenuItem>
                <MenuItem value="&genre_eq=Science Fiction">
                  Science Fiction
                </MenuItem>
                <MenuItem value="&genre_eq=Comic">Comic</MenuItem>
                <MenuItem value="&genre_eq=Poetry">Poetry</MenuItem>
                <MenuItem value="&genre_eq=Children's Literature">
                  Children's Literature
                </MenuItem>
                <MenuItem value="&genre_eq=Adventure">Adventure</MenuItem>
                <MenuItem value="&genre_eq=Psychology">Psychology</MenuItem>
                <MenuItem value="&genre_eq=Business">Business</MenuItem>
                <MenuItem value="&genre_eq=Classic">Classic</MenuItem>
                <MenuItem value="&genre_eq=Romance">Romance</MenuItem>
                <MenuItem value="&genre_eq=Comedy">Comedy</MenuItem>
                <MenuItem value="&genre_eq=Thriller">Thriller</MenuItem>
                <MenuItem value="&genre_eq=Historical Fiction">
                  Historical Fiction
                </MenuItem>
                <MenuItem value="&genre_eq=Western">Western</MenuItem>
                <MenuItem value="&genre_eq=Religion">Religion</MenuItem>
                <MenuItem value="&genre_eq=Mythology">Mythology</MenuItem>
                <MenuItem value="&genre_eq=Philosophy">Philosophy</MenuItem>
                <MenuItem value="&genre_eq=Biography">Biography</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ width: 400, m: 2 }}>
              <Typography>Intervalo de preços</Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceRangeChange}
                min={0}
                max={2000}
              />
              <Typography>
                Min: {priceRange[0]}€ | Max: {priceRange[1]}€
              </Typography>
            </Box>
            <Box>
              <Typography>Nota Mínima</Typography>
              <Rating value={minRating} onChange={handleMinRatingChange} />
            </Box>
          </div>
          <div>
            <label htmlFor="onlyAvailable">Somente os disponíveis? </label>
            <input
              type="checkbox"
              name="onlyAvailable"
              id="onlyAvailable"
              onChange={handleOnlyAvailableChange}
            />
          </div>
          <br />
          <Button type="submit" variant="contained">
            Procurar
          </Button>
        </form>
      </div>
      <hr />
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          border={1}
          sx={{ minWidth: 1500 }}
          size="small"
          aria-label="Tabela de livros"
        >
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell align="right">Autor</TableCell>
              <TableCell align="right">Editora</TableCell>
              <TableCell align="right">Gênero</TableCell>
              <TableCell align="right">ISBN</TableCell>
              <TableCell align="right">Preço (€)</TableCell>
              <TableCell align="right">Avaliação</TableCell>
              <TableCell align="right">Disponibilidade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {booksList.map((book) => (
              <TableRow key={book.uuid}>
                <TableCell>{book.title}</TableCell>
                <TableCell align="right">{book.author}</TableCell>
                <TableCell align="right">{book.publisher}</TableCell>
                <TableCell align="right">{book.genre}</TableCell>
                <TableCell align="right">{book.isbn}</TableCell>
                <TableCell align="right">{book.price}€</TableCell>
                <TableCell align="right">{book.rating}/5</TableCell>
                <TableCell align="right">
                  {book.available ? "Em Stock" : "Fora de Stock"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        {page > 1 && (
          <IconButton
            onClick={() => handleClickPage("previous")}
            aria-label="anterior"
          >
            <NavigateBefore />
          </IconButton>
        )}
        <label>Page {page}</label>
        {
          //! Não consigo buscar limite da paginação pela API
          page <
            Math.floor(100 / quantityPerPage) +
              (100 % quantityPerPage > 0 ? 1 : 0) && (
            <IconButton
              onClick={() => handleClickPage("next")}
              aria-label="anterior"
            >
              <NavigateNext />
            </IconButton>
          )
        }
      </div>
    </>
  );
}

export default Dashboard;
