import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartPage } from './cart.page';
import { CarritoService } from '../services/carrito.service';
import { Router } from '@angular/router';

// Mock del servicio CarritoService
class CarritoServiceMock {
  obtenerCarrito() {
    // Implementación de ejemplo para obtener un carrito vacío
    return [];
  }

  quitarDelCarrito(producto: any) {
    // Implementación de ejemplo para quitar un producto del carrito
  }
}

describe('CartPage', () => {
  let component: CartPage;
  let fixture: ComponentFixture<CartPage>;
  let carritoService: CarritoService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartPage],
      imports: [RouterTestingModule.withRoutes([])], // Importa RouterTestingModule y proporciona rutas vacías
      providers: [
        { provide: CarritoService, useClass: CarritoServiceMock }, // Provee el mock de CarritoService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPage);
    component = fixture.componentInstance;
    carritoService = TestBed.inject(CarritoService); // Inyecta el CarritoService
    router = TestBed.inject(Router); // Inyecta el Router

    spyOn(carritoService, 'obtenerCarrito').and.returnValue([]); // Espía el método obtenerCarrito del CarritoService
    spyOn(carritoService, 'quitarDelCarrito'); // Espía el método quitarDelCarrito del CarritoService
    spyOn(router, 'navigate'); // Espía el método navigate del Router
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a quitarDelCarrito() con el producto correcto', () => {
    const mockProduct = { id: 1, name: 'Producto de Prueba', price: 10 };
    component.quitarDelCarrito(mockProduct);
    expect(carritoService.quitarDelCarrito).toHaveBeenCalledWith(mockProduct);
  });

  it('debería navegar a /inicio cuando se llama a volverInicio()', () => {
    component.volverInicio();
    expect(router.navigate).toHaveBeenCalledWith(['/inicio']);
  });

  it('debería navegar a /catalogo cuando se llama a volverCatalogo()', () => {
    component.volverCatalogo();
    expect(router.navigate).toHaveBeenCalledWith(['/catalogo']);
  });
  
  it('debería navegar a /compra cuando se llama a IraComprar()', () => {
    component.IraComprar();
    expect(router.navigate).toHaveBeenCalledWith(['/compra']);
  });

});

