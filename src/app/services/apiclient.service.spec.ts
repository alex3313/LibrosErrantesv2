import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApiclientService } from './apiclient.service';
import { Observable, of } from 'rxjs';
import { Book } from 'src/app/models/book.interface';

describe('ApiclientService', () => {
  let service: ApiclientService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    // Crear un espía para el HttpClient y sus métodos
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ApiclientService,
        { provide: HttpClient, useValue: spy }
      ]
    });

    // Obtener una instancia del servicio y del espía del HttpClient
    service = TestBed.inject(ApiclientService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener libros basados en la búsqueda', () => {
    const mockBooks: Book[] = [
      { title: 'Libro 1' },
      { title: 'Libro 2' }
    ];
    const query = 'Agatha';

    // Simular el retorno de datos del método get del HttpClient
    httpSpy.get.and.returnValue(of({ docs: mockBooks }));

    service.searchBooks(query).subscribe(response => {
      expect(response.docs.length).toBe(2);
      expect(response.docs).toEqual(mockBooks);
    });

    // Verificar que se llamó al método get del HttpClient con los parámetros correctos
    expect(httpSpy.get.calls.count()).toBe(1, 'una llamada');
    expect(httpSpy.get.calls.mostRecent().args[0]).toContain('/search.json?q=Agatha');
  });
});

