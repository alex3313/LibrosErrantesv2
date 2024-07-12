import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit() {}

  get carrito() {
    return this.carritoService.obtenerCarrito();
  }

  quitarDelCarrito(producto: any) {
    this.carritoService.quitarDelCarrito(producto);
  }

  volverInicio() {
    this.router.navigate(['/inicio']);
  }

  volverCatalogo() {
    this.router.navigate(['/catalogo']);
  }
  IraComprar() {
    this.router.navigate(['/compra']);
  }
}
