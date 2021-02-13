import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Capitulos } from '../model/capitulos';

@Injectable({
  providedIn: 'root'
})
export class CapitulosService {
  url= 'https://www.abibliadigital.com.br/api/verses/';
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new Headers({
      'Content-Type':'aplication/json',
      'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IldlZCBGZWIgMDMgMjAyMSAyMjo0NjoyNSBHTVQrMDAwMC5qb2FvbmV0bzc0OTlAZ21haWwuY29tIiwiaWF0IjoxNjEyMzkyMzg1fQ.omwSuiAWB__Q3BfQhiMa2X5GOZsKh6bbY454JhCvzkM' ,
    })
  }

  getCapitulos(version:string, livro:string, capitulo:number): Observable<Capitulos> {
    console.log(this.url + version + "/" + livro + "/" + capitulo);
    return this.httpClient.get<Capitulos>(this.url + version + "/" + livro + "/" + capitulo)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

   // Manipulação de erros
   handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
