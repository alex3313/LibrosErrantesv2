import { TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { DemandaService } from './demanda.service'; // Asegúrate de importar tu servicio aquí

describe('DemandaService', () => {
  let service: DemandaService;
  let sqliteMock: jasmine.SpyObj<SQLite>;

  beforeEach(() => {
    sqliteMock = jasmine.createSpyObj('SQLite', ['create', 'openDB']); // Crea un mock con los métodos necesarios

    TestBed.configureTestingModule({
      providers: [
        DemandaService,
        { provide: SQLite, useValue: sqliteMock } // Provee el mock de SQLite
      ]
    });
    service = TestBed.inject(DemandaService); // Inyecta DemandaService
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
