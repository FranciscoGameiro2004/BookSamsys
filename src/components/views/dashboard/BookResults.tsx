import "./css/bookResults.css";

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
import { NavigateNext, NavigateBefore, Edit, Delete } from "@mui/icons-material";
import type { Book } from "../../../types/books";

interface BookResultsProps {
  booksList: Book[];
  page: number;
  quantityPerPage: number;
  onClickPage: (input: "next" | "previous") => void;
  onClickEditBook: (bookToEdit: Book) => void;
  onClickDeleteBook: (bookToDelete: Book) => void;
}

export default function BookResults({
  booksList,
  page,
  quantityPerPage,
  onClickPage,
  onClickEditBook,
  onClickDeleteBook,
}: BookResultsProps) {
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
              <TableCell align="center">Ações</TableCell>
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
                <TableCell align="center">
                    <IconButton onClick={() => onClickEditBook(book)}><Edit fontSize="small"/></IconButton>
                    <IconButton onClick={() => onClickDeleteBook(book)}><Delete fontSize="small"/></IconButton>
                </TableCell>
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
      <div className="page-container">
        {page > 1 && (
          <IconButton
            onClick={() => onClickPage("previous")}
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
              onClick={() => onClickPage("next")}
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
