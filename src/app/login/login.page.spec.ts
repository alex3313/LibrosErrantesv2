import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';  // Importa FormsModule si estás usando formularios template-driven
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { UserService } from 'src/app/services/user.service';
import { LoginPage } from './login.page'; // Asegúrate de importar el componente que estás probando

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let sqliteMock: jasmine.SpyObj<SQLite>;

  beforeEach(async () => {
    sqliteMock = jasmine.createSpyObj('SQLite', ['create', 'openDB']); // Crea un mock con los métodos necesarios

    await TestBed.configureTestingModule({
      declarations: [LoginPage], // Declara el componente que estás probando
      imports: [FormsModule], // Importa FormsModule si estás usando formularios template-driven
      providers: [
        UserService,
        { provide: SQLite, useValue: sqliteMock } // Provee el mock de SQLite
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage); // Crea el componente
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Realiza la detección de cambios
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se haya creado correctamente
  });
});

