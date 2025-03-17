import { useState, useEffect } from "react";
import "../css/Dashboard.css";

import { type Book } from "../types/books";

function Dashboard() {
  const apiURL = import.meta.env.VITE_API_BASE_URL;

  const [booksList, setBooksList] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1)
  const [quantityPerPage, setQuantityPerPage] = useState(15)

  useEffect(() => {
    setLoading(true);
    fetch(apiURL + "books" + `?page=${page}` + `&limit=${quantityPerPage}`)
      .then((res) => res.json())
      .then((json) => {
        setBooksList(json);
        console.log(json);
      });
    setLoading(false);
  }, [page, quantityPerPage]);

  const handleClickPage = (input: 'next' | 'previous'): void => {
    if (input === 'next') {
      setPage(previousPage => previousPage + 1)
    } else if (input === 'previous') {
      setPage(previousPage => previousPage - 1)
    }
  }

  return (
    <>
      <h1>Livros</h1>
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
