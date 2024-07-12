import { TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ListarPage } from './listar.page'; // Asegúrate de importar el componente que estás probando
import { DbserviceService } from 'src/app/services/dbservice.service';

describe('ListarPage', () => {
  let component: ListarPage;
  let sqliteMock: jasmine.SpyObj<SQLite>;

  beforeEach(() => {
    sqliteMock = jasmine.createSpyObj('SQLite', ['create', 'openDB']); // Crea un mock con los métodos necesarios

    TestBed.configureTestingModule({
      declarations: [ListarPage], // Declara el componente que estás probando
      providers: [
        DbserviceService,
        { provide: SQLite, useValue: sqliteMock } // Provee el mock de SQLite
      ]
    });

    const fixture = TestBed.createComponent(ListarPage); // Crea el componente
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Realiza la detección de cambios
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se haya creado correctamente
  });
});
