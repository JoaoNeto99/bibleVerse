import { Abbrev } from '../model/abbrev'
export interface Book {
    abbrev: Abbrev;
    name: string;
    author: string;
    group: string;
    version: string;
}