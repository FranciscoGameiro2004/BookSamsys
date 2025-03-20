import { Author } from "./authors";

export interface Book {
    uuid: string,
    isbn: string,
    title: string,
    author: string,
    authorId: Author.uuid | string,
    publisher: string,
    genre: string,
    price: number,
    rating: number,
    available: boolean,
}