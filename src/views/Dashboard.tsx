import {
  useState,
  useEffect,
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
} from "react";
import "../css/Dashboard.css";

import { type Book } from "../types/books";
import { Button, Icon } from "actify";
import { Table, TableHeader, Column, TableBody, Row, Cell } from "actify";

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

  const handleSortChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (input: "asc" | "desc") => {
    setOrderBy(input);
  };

  const handleGenreFilterChange: ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
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
          <input
            type="text"
            value={search}
            placeholder="Pesquisar"
            name="search"
            id="search"
            onChange={handleSearchChange}
          />
          <div>
            <label htmlFor="sortBy">Ordenar por:</label>
            <select
              name="sortBy"
              id="sortBy"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="">Selecione</option>
              <option value="title">Nome</option>
              <option value="author">Autor</option>
              <option value="price">Preço</option>
              <option value="rating">Avaliação</option>
            </select>
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
              <label htmlFor="sortBy">Gênero:</label>
              <select
                name="genreFilter"
                id="genreFilter"
                value={genreFilter}
                onChange={handleGenreFilterChange}
              >
                <option value="">Selecione</option>
                <option value="&genre_eq=Fantasy">Fantasy</option>
                <option value="&genre_eq=Science Fiction">
                  Science Fiction
                </option>
                <option value="&genre_eq=Comic">Comic</option>
                <option value="&genre_eq=Poetry">Poetry</option>
                <option value="&genre_eq=Children's Literature">
                  Children's Literature
                </option>
                <option value="&genre_eq=Adventure">Adventure</option>
                <option value="&genre_eq=Psychology">Psychology</option>
                <option value="&genre_eq=Business">Business</option>
                <option value="&genre_eq=Classic">Classic</option>
                <option value="&genre_eq=Romance">Romance</option>
                <option value="&genre_eq=Comedy">Comedy</option>
                <option value="&genre_eq=Thriller">Thriller</option>
                <option value="&genre_eq=Historical Fiction">
                  Historical Fiction
                </option>
                <option value="&genre_eq=Western">Western</option>
                <option value="&genre_eq=Religion">Religion</option>
                <option value="&genre_eq=Mythology">Mythology</option>
                <option value="&genre_eq=Philosophy">Philosophy</option>
                <option value="&genre_eq=Biography">Biography</option>
              </select>
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
      <hr />
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
