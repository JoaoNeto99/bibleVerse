import { Component, OnInit } from '@angular/core'
import { BooksService } from '../app/service/books.service';
import { VersionService } from '../app/service/version.service';
import { CapitulosService } from '../app/service/capitulos.service';
import { Books } from './model/books';
import { Version } from './model/version';
import { getCapitulo } from './model/getCapitulo';
import { Capitulos } from './model/capitulos';

import { Book } from './model/book';
import { Versos } from './model/versos';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'BibleVerse';

  livros = new Array<Books>();
  velho = new Array<Books>();
  novoTest = new Array<Books>();
  capitulo = new Array<Number>();
  versao = new Array<Version>();
  valida: Boolean = false;
  l: Books;
  texto: Capitulos;
  versos = new Array<Versos>();
  cap: number;
  nomeLivro: string;
  abbLivro: string;
  ultimo: Number = 28;

  constructor(private booksService: BooksService,
    private versionService:VersionService,
    private capituloService: CapitulosService){ }

  async ngOnInit() {
    this.livros = await this.getLivros();
    this.getVt();
    this.versao = await this.getVersion();
    this.pegaCapitulos(1, "mt");
  }
// json -----------------------------------------------------------------
  async getLivros() {
   return this.booksService.getLivros().toPromise(); 
  }

  async getVersion() {
    return this.versionService.getVersion().toPromise();
  }

// BUTTONS-------------------------------------------------------------------------


  pegaVersao(s:string): void{
    this.capituloService.getCapitulos(s, this.l.abbrev.pt, this.cap).subscribe((texto: Capitulos) => {
      this.texto = texto;
      this.versos = this.texto.verses;
      console.log(this.texto);
      this.nomeLivro = texto.book.name;

    } );
    console.log(this.l.name);
  }

  pegaCapitulos(c: number, abbrev: string): void{
    if(c > 0){
      this.cap = c;
      this.capituloService.getCapitulos("acf", abbrev, c).subscribe((texto: Capitulos) => {
        this.texto = texto;
        this.versos = this.texto.verses;
        this.nomeLivro = texto.book.name;
        this.abbLivro = texto.book.abbrev.pt;
      } );
      this.valida = false;
    }
   }

  pegaLivro(l: Books): void {
    //const t = document.querySelector('#teste');
    //t.addEventListener('click',(event)=> event.stopPropagation());
    event.stopPropagation();
    this.l = l;
    this.capitulo.length = 0;
    this.valida = true;
    for(let c = 1; c <= l.chapters; c++){
      this.capitulo.push(c);
    }
    this.ultimo = this.capitulo[this.capitulo.length - 1];
    console.log(this.ultimo);
  }

  getVt(): void {
    this.livros.forEach(book => {
      if(book.testament === "VT"){
        this.velho.push(book);
      } else {
        this.novoTest.push(book);
      }
    });

  }
/*----------------------------------------------------------------
  $('ul.dropdown-menu.mega-dropdown-menu').on('click', function(event){
    // The event won't be propagated up to the document NODE and 
    // therefore delegated events won't be fired
    event.stopPropagation();
});
*/
}
