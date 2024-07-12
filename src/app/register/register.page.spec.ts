import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { UserService } from 'src/app/services/user.service';
import { RegisterPage } from './register.page'; // Asegúrate de importar el componente que estás probando

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let sqliteMock: jasmine.SpyObj<SQLite>;

  beforeEach(async () => {
    sqliteMock = jasmine.createSpyObj('SQLite', ['create', 'openDB']); // Crea un mock con los métodos necesarios

    await TestBed.configureTestingModule({
      declarations: [RegisterPage], // Declara el componente que estás probando
      imports: [
        FormsModule // Importa FormsModule aquí
      ],
      providers: [
        UserService,
        { provide: SQLite, useValue: sqliteMock } // Provee el mock de SQLite
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage); // Crea el componente
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Realiza la detección de cambios
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se haya creado correctamente
  });
});
