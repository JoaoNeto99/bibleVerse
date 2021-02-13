import { Book } from "./book";

export interface Verso{
    livro: Book;
    capitulo: number;
    numero: number;
    text: string;
}