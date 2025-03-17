import { useState, useEffect, ChangeEventHandler, FormEventHandler, MouseEventHandler } from "react";
import "../css/Dashboard.css";

import { type Book } from "../types/books";

function Dashboard() {
  const apiURL = import.meta.env.VITE_API_BASE_URL;

  const [booksList, setBooksList] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1)
  const [quantityPerPage, setQuantityPerPage] = useState(15)

  const [search, setSearch] = useState('')
  const [orderBy, setOrderBy] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [orderAndSort, setOrderAndSort] = useState('')

  useEffect(() => {
    fetchBooks()
  }, [page, quantityPerPage]);

  useEffect(() => {
    if (orderBy !== '' && sortBy !== '') {
      setOrderAndSort(`&sort=${sortBy}&order=${orderBy}`)
    } else if (sortBy !== '') {
      setOrderAndSort(`&sort=${sortBy}`)
    } else {
      setOrderAndSort('')
    }
  }, [orderBy, sortBy])

  const fetchBooks = async ():Promise<void> => {
    setLoading(true);
    fetch(apiURL + "books" + `?page=${page}` + `&limit=${quantityPerPage}` + `&search=${search}` + orderAndSort)
      .then((res) => res.json())
      .then((json) => {
        setBooksList(json);
        console.log(json);
      });
    setLoading(false);
  } 

  const handleClickPage = (input: 'next' | 'previous'): void => {
    if (input === 'next') {
      setPage(previousPage => previousPage + 1)
    } else if (input === 'previous') {
      setPage(previousPage => previousPage - 1)
    }
  }

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value)
  }

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await fetchBooks()
  }

  const handleSortChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSortBy(e.target.value)
  }

  const handleOrderChange = (input: 'asc' | 'desc') => {
    setOrderBy(input)
  }

  return (
    <>
      <h1>Livros</h1>
      <div>
        <form action="#" onSubmit={handleFormSubmit}>
          <input type="text" value={search} placeholder="Pesquisar" name="search" id="search" onChange={handleSearchChange}/>
          <div>
            <label htmlFor="sortBy">Ordenar por:</label>
            <select name="sortBy" id="sortBy" value={sortBy} onChange={handleSortChange}>
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
              <input type="radio" name="orderBy" id="ascRadioBtn" value="asc" onClick={() => handleOrderChange('asc')} />
              <label htmlFor="ascRadioBtn">Crescente</label>
              <input type="radio" name="orderBy" id="descRadioBtn" value="desc" onClick={() => handleOrderChange('desc')} />
              <label htmlFor="descRadioBtn">Derescente</label>
            </div>
          </div>
          <br />
          <input type="submit" value="Procurar" />
        </form>
      </div>
      <hr />
      <table border={1}>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Editora</th>
            <th>Gênero</th>
            <th>Preço (€)</th>
            <th>Avaliação</th>
            <th>Disponibilidade</th>
          </tr>
        </thead>
        <tbody>
          {booksList.map((book) => 
            (
              <tr key={book.uuid}>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.genre}</td>
                <td>{book.price}€</td>
                <td>{book.rating}/5</td>
                <td>{book.available ? "Em Stock" : "Fora de Stock"}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div>
        {page > 1 && <button type="button" onClick={() => handleClickPage('previous')}>{'<'}</button>}
        <label>Page {page}</label>
        {//! Não consigo buscar limite da paginação pela API
        page < Math.floor(100/quantityPerPage) + (100%quantityPerPage > 0 ? 1 : 0) && <button type="button"  onClick={() => handleClickPage('next')}>{'>'}</button>}
      </div>
    </>
  );
}

export default Dashboard;
