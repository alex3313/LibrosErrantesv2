import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { CompraRegistroService } from '../services/compraregistro.service'; // Importar el servicio
import { CompraPage } from './compra.page';

describe('CompraPage', () => {
  let component: CompraPage;
  let fixture: ComponentFixture<CompraPage>;

  // Crea un mock de SQLite
  const mockSQLite = {
    // Define aquí los métodos necesarios para tus pruebas
    openDatabase: () => Promise.resolve(),
    executeSql: () => Promise.resolve()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraPage ],
      providers: [
        CompraRegistroService,  // Agrega tu servicio aquí si no está providedIn: 'root'
        { provide: SQLite, useValue: mockSQLite }  // Provee el mock de SQLite
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
