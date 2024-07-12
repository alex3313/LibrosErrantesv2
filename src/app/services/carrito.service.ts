import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: any[] = [];

  constructor() {}

  agregarAlCarrito(producto: any) {
    const libro = this.carrito.findIndex(item => item.id === producto.id);
    if (libro !== -1) {
      this.carrito[libro].cantidad++;
    } else {
      producto.cantidad = 1; // Inicialmente se agrega con cantidad 1
      this.carrito.push({ ...producto });
    }
  }

  quitarDelCarrito(producto: any) {
    const libro = this.carrito.findIndex(item => item.id === producto.id);
    if (libro !== -1) {
      if (this.carrito[libro].cantidad > 1) {
        this.carrito[libro].cantidad--;
      } else {
        this.carrito.splice(libro, 1);
      }
    }
  }

  obtenerCarrito() {
    return this.carrito;
  }

  vaciarCarrito() {
    this.carrito = [];
  }
}
