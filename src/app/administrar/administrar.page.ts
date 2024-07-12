import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.page.html',
  styleUrls: ['./administrar.page.scss'],
})
export class AdministrarPage implements OnInit {

  nombreProducto: string = '';
  precioProducto: string = '';
  autorProducto: string = '';

  constructor(private router: Router, private db: DbserviceService) { }

  ngOnInit() {
  }

  agregar() {
    this.db.addProducto(this.nombreProducto, this.precioProducto, this.autorProducto).then(() => {
      this.db.presentToast("Producto agregado");
      this.router.navigate(['/listar']);
    }).catch(err => {
      this.db.presentToast("Error agregando producto: " + err);
    });
  }

  validarFormulario(): boolean {
    return this.nombreProducto && this.precioProducto && this.autorProducto ? true : false;
  }
}
