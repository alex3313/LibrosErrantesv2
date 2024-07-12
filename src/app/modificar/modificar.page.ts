import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { Productos } from 'src/app/services/productos';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {
  id!: number;
  nombre!: string;
  precio!: string;
  autor!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioBD: DbserviceService
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const state = navigation.extras.state as {
        idEnviado: number,
        nombreEnviado: string,
        precioEnviado: string,
        autorEnviado: string
      };
      this.id = state.idEnviado;
      this.nombre = state.nombreEnviado;
      this.precio = state.precioEnviado;
      this.autor = state.autorEnviado;
    } else {
      // Manejar el caso donde no hay datos enviados correctamente
      console.error('No se encontraron datos para modificar.');
      // Redirigir o manejar de acuerdo a tu lógica de la aplicación
      this.router.navigate(['/listar']);
    }
  }

  guardarCambios() {
    this.servicioBD.updateProducto(this.id, this.nombre, this.precio, this.autor)
      .then(() => {
        this.servicioBD.presentToast('Producto modificado');
        this.router.navigate(['/listar']); // Navegar de vuelta a la lista después de modificar
      })
      .catch(error => {
        console.error('Error al modificar el producto:', error);
        this.servicioBD.presentToast('Error al modificar el producto');
      });
  }
}
