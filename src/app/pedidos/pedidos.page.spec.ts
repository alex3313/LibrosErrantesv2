import { TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { CompraRegistroService } from '../services/compraregistro.service'; // Importar el servicio

describe('CompraRegistroService', () => {
  let service: CompraRegistroService;
  let sqliteMock: jasmine.SpyObj<SQLite>;

  beforeEach(() => {
    sqliteMock = jasmine.createSpyObj('SQLite', ['create', 'openDB']); // Crea un mock con los métodos necesarios

    TestBed.configureTestingModule({
      providers: [
        CompraRegistroService,
        { provide: SQLite, useValue: sqliteMock } // Provee el mock de SQLite
      ]
    });
    service = TestBed.inject(CompraRegistroService); // Inyecta CompraRegistroService
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
