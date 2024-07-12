import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';  // Asegúrate de importar desde la ubicación correcta
import { CompraRegistroService } from '../services/compraregistro.service';  // Asegúrate de importar tu servicio aquí

describe('CompraRegistroService', () => {
  let service: CompraRegistroService;
  let sqliteMock: SQLite;

  beforeEach(() => {
    sqliteMock = jasmine.createSpyObj('SQLite', ['create', 'openDB']);  // Crea un mock con los métodos necesarios

    TestBed.configureTestingModule({
      providers: [
        CompraRegistroService,
        { provide: SQLite, useValue: sqliteMock }  // Provee el mock de SQLite
      ]
    });
    service = TestBed.inject(CompraRegistroService);  // Inyecta CompraRegistroService
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
