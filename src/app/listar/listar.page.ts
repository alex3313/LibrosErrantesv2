import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  arregloProductos: any = [
    {
      id: '',
      nombre: '',
      precio: '',
      autor: ''
    }
  ];

  constructor(private router: Router, private servicioBD: DbserviceService) { }

  ngOnInit() {
    this.servicioBD.dbState().subscribe(res => {
      if (res) {
        this.servicioBD.fetchProductos().subscribe(item => {
          this.arregloProductos = item;
        });
      }
    });
  }

  obtenerTexto($event: any) {
    const valor = $event.target.value;
    console.log("Texto escrito: " + valor);
  }

  modificar(x: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: x.id,
        nombreEnviado: x.nombre,
        precioEnviado: x.precio,
        autorEnviado: x.autor
      }
    };

    this.router.navigate(['/modificar'], navigationExtras);
  }

  eliminar(x: any) {
    this.servicioBD.deleteProducto(x.id).then(() => {
      this.servicioBD.presentToast("Producto Eliminado");
    });
  }
}
