import { TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AuthGuard } from './auth.guard'; // Asegúrate de importar tu guardia aquí
import { UserService } from '../services/user.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let sqliteMock: jasmine.SpyObj<SQLite>;

  beforeEach(() => {
    sqliteMock = jasmine.createSpyObj('SQLite', ['create', 'openDB']); // Crea un mock con los métodos necesarios

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        UserService,
        { provide: SQLite, useValue: sqliteMock } // Provee el mock de SQLite
      ]
    });
    guard = TestBed.inject(AuthGuard); // Inyecta AuthGuard
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
