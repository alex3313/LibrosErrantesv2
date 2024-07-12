import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { DbserviceService } from '../services/dbservice.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {
  productos: any[] = [];

  constructor(private carritoService: CarritoService, private dbService: DbserviceService, private router: Router) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.dbService.dbState().subscribe(res => {
      if (res) {
        this.dbService.fetchProductos().subscribe(items => {
          this.productos = items;
        });
      }
    });
  }

  agregarAlCarrito(producto: any) {
    this.carritoService.agregarAlCarrito(producto);
    this.dbService.presentToast("Producto agregado al carrito");
  }

  irACarrito() {
    this.router.navigate(['/cart']);
  }

  volverInicio() {
    this.router.navigate(['/inicio']);
  }
}
