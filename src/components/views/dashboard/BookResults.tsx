import './css/bookResults.css'

import {
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import type { Book } from "../../../types/books";

interface BookResultsProps {
    booksList: Book[],
    page: number,
    quantityPerPage: number,
    handleClickPage: (input: "next" | "previous") => void,
}

export default function BookResults({booksList, page, quantityPerPage, handleClickPage}: BookResultsProps) {
  return (
    <>
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
      <div className='page-container'>
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
