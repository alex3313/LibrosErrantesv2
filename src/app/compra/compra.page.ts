import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Plugins } from '@capacitor/core';
import { CarritoService } from '../services/carrito.service';
import { CompraRegistroService } from '../services/compraregistro.service'; // Importar el servicio

const { Geolocation } = Plugins;

@Component({
  selector: 'app-compra',
  templateUrl: './compra.page.html',
  styleUrls: ['./compra.page.scss'],
})
export class CompraPage implements OnInit {
  productosSeleccionados: any[] = [];
  userLocation: { lat: number, lng: number } = { lat: 0, lng: 0 };
  map: L.Map | undefined;
  nombre: string = '';
  apellido: string = '';

  constructor(private carritoService: CarritoService, private compraRegistroService: CompraRegistroService) { }

  ngOnInit() {
    this.productosSeleccionados = this.carritoService.obtenerCarrito();
  }

  async getUserLocation() {
    try {
      const coordinates = await Geolocation['getCurrentPosition']();
      this.userLocation = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      };
      console.log('User Location:', this.userLocation);

      this.initializeMap();
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }

  initializeMap() {
    if (!this.map) {
      this.map = L.map('map').setView([this.userLocation.lat, this.userLocation.lng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      L.marker([this.userLocation.lat, this.userLocation.lng]).addTo(this.map)
        .bindPopup('Tu ubicación actual')
        .openPopup();
    }
  }

  realizarPedido() {
    // Calcular el total de los productos seleccionados considerando la cantidad
    const total = this.productosSeleccionados.reduce((sum, producto) => {
      const subtotal = parseFloat(producto.precio) * producto.cantidad;
      return sum + subtotal;
    }, 0);

    const nuevoPedido = {
      nombre: this.nombre,
      apellido: this.apellido,
      lat: this.userLocation.lat.toString(),
      lng: this.userLocation.lng.toString(),
      total: total.toString()
    };

    this.compraRegistroService.addCompra(nuevoPedido).then(() => {
      console.log('Pedido realizado:', nuevoPedido);
      // Aquí puedes agregar lógica adicional, como navegar a otra página o mostrar un mensaje de éxito
    });
  }
}

