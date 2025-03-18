import {
  useState,
  useEffect,
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
} from "react";
import "../css/Dashboard.css";

import { type Book } from "../types/books";
import { Button, Icon, TextField } from "actify";
import { Table, TableHeader, Column, TableBody, Row, Cell } from "actify";
import { Select, SelectOption } from "actify";
import { RadioGroup, Radio } from "actify";

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

  const handleSearchChange = (newValue: string) => {
    setSearch(newValue);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setPage(1);
    await fetchBooks();
  };

  const handleSortChange = (newValue: (string)) => {
    setSortBy(newValue);
  };

  const handleOrderChange = (input: string) => {
    setOrderBy(input);
  };

  const handleGenreFilterChange = (newValue: string) => {
    setGenreFilter(newValue)
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
            type="text"
            value={search}
            placeholder="Pesquisar"
            name="search"
            id="search"
            onChange={handleSearchChange}
            leadingIcon={<Icon>Search</Icon>}
          />
          <div>
            <Select
              label="Ordenar por"
              selectedKey={sortBy}
              onSelectionChange={handleSortChange}
            >
              <SelectOption key="">Selecione</SelectOption>
              <SelectOption key="title">Nome</SelectOption>
              <SelectOption key="author">Autor</SelectOption>
              <SelectOption key="price">Preço</SelectOption>
              <SelectOption key="rating">Avaliação</SelectOption>
            </Select>
          </div>
          <div>
            <label>Por ordem:</label>
            <RadioGroup onChange={handleOrderChange} value={orderBy}>
              <Radio value="asc">Crescente</Radio>
              <Radio value="desc">Decrescente</Radio>
            </RadioGroup>
          </div>
          <div>
            <label htmlFor="">Filtros</label>
            <div>
              <label htmlFor="sortBy">Gênero:</label>
              <Select
                name="genreFilter"
                id="genreFilter"
                selectedKey={genreFilter}
                onChange={handleGenreFilterChange}
              >
                <SelectOption key="">Selecione</SelectOption>
                <SelectOption key="&genre_eq=Fantasy">Fantasy</SelectOption>
                <SelectOption key="&genre_eq=Science Fiction">
                  Science Fiction
                </SelectOption>
                <SelectOption key="&genre_eq=Comic">Comic</SelectOption>
                <SelectOption key="&genre_eq=Poetry">Poetry</SelectOption>
                <SelectOption key="&genre_eq=Children's Literature">
                  Children's Literature
                </SelectOption>
                <SelectOption key="&genre_eq=Adventure">
                  Adventure
                </SelectOption>
                <SelectOption key="&genre_eq=Psychology">
                  Psychology
                </SelectOption>
                <SelectOption key="&genre_eq=Business">Business</SelectOption>
                <SelectOption key="&genre_eq=Classic">Classic</SelectOption>
                <SelectOption key="&genre_eq=Romance">Romance</SelectOption>
                <SelectOption key="&genre_eq=Comedy">Comedy</SelectOption>
                <SelectOption key="&genre_eq=Thriller">Thriller</SelectOption>
                <SelectOption key="&genre_eq=Historical Fiction">
                  Historical Fiction
                </SelectOption>
                <SelectOption key="&genre_eq=Western">Western</SelectOption>
                <SelectOption key="&genre_eq=Religion">Religion</SelectOption>
                <SelectOption key="&genre_eq=Mythology">
                  Mythology
                </SelectOption>
                <SelectOption key="&genre_eq=Philosophy">
                  Philosophy
                </SelectOption>
                <SelectOption key="&genre_eq=Biography">
                  Biography
                </SelectOption>
              </Select>
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
          <Button type="submit">Procurar</Button>
        </form>
      </div>

      <Table
        aria-label="Lista de Livros"
        style={{ height: "210px", maxWidth: "400px" }}
      >
        <TableHeader>
          <Column key="isbn">ISBN</Column>
          <Column key="title">Título</Column>
          <Column key="author">Autor</Column>
          <Column key="publisher">Editora</Column>
          <Column key="genre">Gênero</Column>
          <Column key="price">Preço (€)</Column>
          <Column key="rating">Avaliação</Column>
          <Column key="available">Disponibilidade</Column>
        </TableHeader>
        <TableBody items={booksList}>
          {(book: Book) => (
            <Row key={book.uuid}>
              <Cell>{book.isbn}</Cell>
              <Cell>{book.title}</Cell>
              <Cell>{book.author}</Cell>
              <Cell>{book.publisher}</Cell>
              <Cell>{book.genre}</Cell>
              <Cell>{book.price}€</Cell>
              <Cell>{book.rating}/5</Cell>
              <Cell>{book.available ? "Em Stock" : "Fora de Stock"}</Cell>
            </Row>
          )}
        </TableBody>
      </Table>
      <div>
        {page > 1 && (
          <Button onPress={() => handleClickPage("previous")}>
            <Icon>Arrow_Back_iOS</Icon>
          </Button>
        )}
        <label>Page {page}</label>
        {
          //! Não consigo buscar limite da paginação pela API
          page <
            Math.floor(100 / quantityPerPage) +
              (100 % quantityPerPage > 0 ? 1 : 0) && (
            <Button type="button" onPress={() => handleClickPage("next")}>
              <Icon>Arrow_Forward_iOS</Icon>
            </Button>
          )
        }
      </div>
    </>
  );
}

export default Dashboard;
