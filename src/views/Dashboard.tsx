import {
  useState,
  useEffect,
  ChangeEventHandler,
  FormEventHandler,
} from "react";
import "../css/Dashboard.css";

import { type Book } from "../types/books";
import { type SelectChangeEvent } from "@mui/material";

import { Button, IconButton, FormControl } from "@mui/material";
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
import { NavigateNext, NavigateBefore } from "@mui/icons-material";
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

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [priceRange, setPriceRange] = useState(
    `&price_gte=${minPrice}&price_lte=${maxPrice}`
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
    setPriceRange(`&price_gte=${minPrice}&price_lte=${maxPrice}`);
  }, [minPrice, maxPrice]);

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
        priceRange +
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

  const handleOrderChange = (input: "asc" | "desc") => {
    setOrderBy(input);
  };

  const handleGenreFilterChange = (e: SelectChangeEvent<string>) => {
    setGenreFilter(e.target.value);
  };

  const handleMinPriceChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setMinPrice(+e.target.value);
  };
  const handleMaxPriceChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setMaxPrice(+e.target.value);
  };

  const handleMinRatingChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setMinRating(+e.target.value);
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
            <label>Por ordem:</label>
            <div>
              <input
                type="radio"
                name="orderBy"
                id="ascRadioBtn"
                value="asc"
                onClick={() => handleOrderChange("asc")}
              />
              <label htmlFor="ascRadioBtn">Crescente</label>
              <input
                type="radio"
                name="orderBy"
                id="descRadioBtn"
                value="desc"
                onClick={() => handleOrderChange("desc")}
              />
              <label htmlFor="descRadioBtn">Derescente</label>
            </div>
          </div>
          <div>
            <label htmlFor="">Filtros</label>
            {/*Filtrar por
                [X] Gênero (opt)
                [X] Preço (min + max)
                [X] Avaliação (min)
                [] Disponibilidade (t/f)
              */}
            <div>
              <FormControl sx={{m: 1, minWidth:100}}>
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
            </div>
            <div>
              <input
                type="range"
                name="minPrice"
                min={0}
                max={maxPrice}
                value={minPrice}
                id="minPrice"
                onChange={handleMinPriceChange}
              />
              <input
                type="range"
                name="maxPrice"
                min={minPrice}
                max={3000}
                value={maxPrice}
                id="maxPrice"
                onChange={handleMaxPriceChange}
              />
              <p>
                Min: {minPrice}€ | Max: {maxPrice}€
              </p>
            </div>
            <div>
              <label>Nota Mínima: {minRating}★</label>
              <br />
              <input
                type="range"
                name="maxPrice"
                min={1}
                max={5}
                value={minRating}
                id="minRating"
                onChange={handleMinRatingChange}
              />
            </div>
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
