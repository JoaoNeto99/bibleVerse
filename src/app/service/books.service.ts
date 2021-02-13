import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Books } from '../model/books';
@Injectable({
    providedIn: 'root'
})
  
export class BooksService {
    url = 'https://www.abibliadigital.com.br/api/books'

    constructor(private httpClient: HttpClient){     }

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IldlZCBGZWIgMDMgMjAyMSAyMjo0NjoyNSBHTVQrMDAwMC5qb2FvbmV0bzc0OTlAZ21haWwuY29tIiwiaWF0IjoxNjEyMzkyMzg1fQ.omwSuiAWB__Q3BfQhiMa2X5GOZsKh6bbY454JhCvzkM'  
        })
    }


    getLivros(): Observable<Books[]>{
      return this.httpClient.get<Books[]>(this.url)
        .pipe(
          retry(2),
          catchError(this.handleError))
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