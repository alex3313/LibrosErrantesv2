import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';  // Asegúrate de importar desde la ubicación correcta
import { UserService } from './user.service';  // Asegúrate de importar tu servicio aquí

describe('UserService', () => {
  let service: UserService;
  let sqliteMock: SQLite;

  beforeEach(() => {
    sqliteMock = jasmine.createSpyObj('SQLite', ['create', 'openDB']);  // Crea un mock con los métodos necesarios

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: SQLite, useValue: sqliteMock }  // Provee el mock de SQLite
      ]
    });
    service = TestBed.inject(UserService);  // Inyecta UserService
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

