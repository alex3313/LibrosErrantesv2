import { TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';  // Asegúrate de importar desde la ubicación correcta
import { Demanda } from '../services/demanda';

describe('DemandaService', () => {
  let service: Demanda;
  let sqliteMock: any;

  beforeEach(() => {
    sqliteMock = jasmine.createSpyObj('SQLite', ['create', 'openDB']);  // Crea un mock con los métodos necesarios

    TestBed.configureTestingModule({
      providers: [
        Demanda,
        { provide: SQLite, useValue: sqliteMock }  // Provee el mock de SQLite
      ]
    });
    service = TestBed.inject(Demanda);  // Inyecta DemandaService
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
