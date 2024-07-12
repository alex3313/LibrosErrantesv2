import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from 'src/app/models/book.interface'; // Importa la interfaz Book

@Injectable({
  providedIn: 'root'
})
export class ApiclientService {
  private baseUrl: string = 'https://openlibrary.org';

  constructor(private http: HttpClient) { }

  searchBooks(query: string): Observable<{ docs: Book[] }> {
    return this.http.get<{ docs: Book[] }>(`${this.baseUrl}/search.json?q=${query}`).pipe(
      map(response => response)
    );
  }
}
  