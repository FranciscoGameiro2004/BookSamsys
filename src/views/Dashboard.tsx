import { useState, useEffect, type ReactNode } from "react";
import "../css/Dashboard.css";

import { type Book } from "../types/books";

function Dashboard() {
  const apiURL = import.meta.env.VITE_API_BASE_URL;

  const [booksList, setBooksList] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(apiURL + "books")
      .then((res) => res.json())
      .then((json) => {
        setBooksList(json);
        console.log(json);
        
      });
    setLoading(false);
  }, []);

  return (
    <>
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
    </>
  );
}

export default Dashboard;
