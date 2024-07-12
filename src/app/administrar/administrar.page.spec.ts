import { TestBed } from '@angular/core/testing';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { DbserviceService } from '../services/dbservice.service';

describe('AdministrarPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DbserviceService,
        SQLite  // Añade SQLite como proveedor aquí
      ]
    });
  });

  it('should create', () => {
    const service: DbserviceService = TestBed.inject(DbserviceService);  // Usa TestBed.inject para obtener una instancia del servicio
    expect(service).toBeTruthy();  // Verifica que el servicio se haya creado correctamente
  });
});
