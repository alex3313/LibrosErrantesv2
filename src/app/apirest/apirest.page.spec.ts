import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule

import { ApiclientService } from 'src/app/services/apiclient.service';  // Asegúrate de importar el servicio que estás probando

describe('ApirestPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],  // Añade HttpClientModule aquí
      providers: [ApiclientService]  // Asegúrate de incluir tu servicio y cualquier otro necesario
    });
  });

  it('should create', () => {
    const service: ApiclientService = TestBed.inject(ApiclientService);  // Usa TestBed.inject para obtener una instancia del servicio
    expect(service).toBeTruthy();  // Verifica que el servicio se haya creado correctamente
  });
});
