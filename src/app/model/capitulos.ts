import { Book } from "./book";
import { Capitulo } from "./capitulo";
import { Versos } from "./versos";

export interface Capitulos {
    book: Book;
    chapter: Capitulo;
    verses: Versos[]; 
}