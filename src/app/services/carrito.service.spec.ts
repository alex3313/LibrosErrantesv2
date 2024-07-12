import { TestBed } from '@angular/core/testing';
import { CarritoService } from './carrito.service';

describe('CarritoService', () => {
  let service: CarritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería agregar un producto al carrito correctamente', () => {
    const mockProduct = { id: 1, name: 'Libro 1' };

    service.agregarAlCarrito(mockProduct);
    const carrito = service.obtenerCarrito();

    expect(carrito.length).toBe(1);
    expect(carrito[0]).toEqual({ id: 1, name: 'Libro 1', cantidad: 1 });
  });

  it('debería aumentar la cantidad de un producto existente en el carrito', () => {
    const mockProduct = { id: 1, name: 'Libro 1' };

    service.agregarAlCarrito(mockProduct);
    service.agregarAlCarrito(mockProduct);

    const carrito = service.obtenerCarrito();
    expect(carrito.length).toBe(1);
    expect(carrito[0].cantidad).toBe(2);
  });

  it('debería quitar un producto del carrito correctamente', () => {
    const mockProduct1 = { id: 1, name: 'Libro 1' };
    const mockProduct2 = { id: 2, name: 'Libro 2' };

    service.agregarAlCarrito(mockProduct1);
    service.agregarAlCarrito(mockProduct2);

    service.quitarDelCarrito(mockProduct1);
    let carrito = service.obtenerCarrito();
    expect(carrito.length).toBe(1);
    expect(carrito[0]).toEqual({ id: 2, name: 'Libro 2', cantidad: 1 });

    service.quitarDelCarrito(mockProduct2);
    carrito = service.obtenerCarrito();
    expect(carrito.length).toBe(0);
  });

  it('debería vaciar el carrito correctamente', () => {
    const mockProduct = { id: 1, name: 'Libro 1' };

    service.agregarAlCarrito(mockProduct);
    service.vaciarCarrito();

    const carrito = service.obtenerCarrito();
    expect(carrito.length).toBe(0);
  });

});
