import { TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';  // Asegúrate de importar desde la ubicación correcta
import { DbserviceService } from 'src/app/services/dbservice.service';

describe('DbserviceService', () => {
  let service: DbserviceService;
  let sqliteMock: any;

  beforeEach(() => {
    sqliteMock = jasmine.createSpyObj('SQLite', ['create', 'openDB']);  // Crea un mock con los métodos necesarios

    TestBed.configureTestingModule({
      providers: [
        DbserviceService,
        { provide: SQLite, useValue: sqliteMock }  // Provee el mock de SQLite
      ]
    });
    service = TestBed.inject(DbserviceService);  // Inyecta DbserviceService
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
