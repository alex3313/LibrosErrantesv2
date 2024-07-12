// apirest.page.ts
import { Component, OnInit } from '@angular/core';
import { ApiclientService } from 'src/app/services/apiclient.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Book } from 'src/app/models/book.interface'; // Asegúrate de tener importada tu interfaz Book
import { DemandaService } from 'src/app/services/demanda.service'; // Importa tu servicio de demandas aquí

@Component({
  selector: 'app-apirest',
  templateUrl: './apirest.page.html',
  styleUrls: ['./apirest.page.scss'],
})
export class ApirestPage implements OnInit {
  books: Book[] = [];
  query: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  private searchSubject: Subject<string> = new Subject();

  constructor(
    private api: ApiclientService,
    private demandaService: DemandaService // Inyectando servicio de demandas aquí
  ) {}

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.isLoading = true;
      this.errorMessage = '';
      this.api.searchBooks(query).subscribe(
        (data) => {
          this.books = data.docs.map((bookData) => {
            const book: Book = {
              cover_i: bookData.cover_i,
              title: bookData.title,
              author_name: bookData.author_name,
              coverUrl: bookData.cover_i ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-M.jpg` : null
            };
            return book;
          });
          this.isLoading = false;
        },
        (error) => {
          this.errorMessage = error;
          this.isLoading = false;
        }
      );
    });
  }

  onSearchChange(event: any) {
    this.searchSubject.next(event.target.value);
  }

  pedirLibro(book: Book) {
    this.demandaService.addDemanda(book.title, book.author_name!.join(', '))
      .then(() => {
        console.log('Libro pedido correctamente:', book.title);
      })
      .catch(error => console.error('Error al pedir el libro', error));
  }
}



