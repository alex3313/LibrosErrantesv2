import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { UserService } from 'src/app/services/user.service';
import { InicioPage } from './inicio.page'; // Asegúrate de importar el componente que estás probando

describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;
  let sqliteMock: jasmine.SpyObj<SQLite>;

  beforeEach(async () => {
    sqliteMock = jasmine.createSpyObj('SQLite', ['create', 'openDB']); // Crea un mock con los métodos necesarios

    await TestBed.configureTestingModule({
      declarations: [InicioPage], // Declara el componente que estás probando
      providers: [
        UserService,
        { provide: SQLite, useValue: sqliteMock } // Provee el mock de SQLite
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioPage); // Crea el componente
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Realiza la detección de cambios
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se haya creado correctamente
  });
});
