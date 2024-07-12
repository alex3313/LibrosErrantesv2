import { Component, OnInit } from '@angular/core';
import { CompraRegistroService } from '../services/compraregistro.service'; // Importar el servicio
import { compras } from '../services/compras'; // Importar el modelo

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  pedidos: compras[] = [];

  constructor(private compraRegistroService: CompraRegistroService) { }

  ngOnInit() {
    this.obtenerPedidos();
  }

  obtenerPedidos() {
    this.compraRegistroService.fetchCompras().subscribe(res => {
      this.pedidos = res;
    });
  }
}
