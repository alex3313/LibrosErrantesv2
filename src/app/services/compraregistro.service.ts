import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { compras } from './compras';

@Injectable({
  providedIn: 'root'
})
export class CompraRegistroService {
  private database!: SQLiteObject;
  private tablaCompras: string = "CREATE TABLE IF NOT EXISTS compras(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL, apellido VARCHAR(50) NOT NULL, lat VARCHAR(50) NOT NULL, lng VARCHAR(50) NOT NULL, total VARCHAR(50) NOT NULL);";
  private listaCompras = new BehaviorSubject<compras[]>([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, public toastController: ToastController) {
    this.crearBD();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'compras.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.presentToast("BD Creada");
        this.crearTablas();
      }).catch(e => this.presentToast(e));
    });
  }

  async crearTablas() {
    try {
      await this.database.executeSql(this.tablaCompras, []);
      this.presentToast("Tabla Creada");
      this.buscarCompras();
      this.isDbReady.next(true);
    } catch (e) {
      this.presentToast("Error creando tabla: " + e);
    }
  }

  addCompra(compra: compras) {
    let data = [compra.nombre, compra.apellido, compra.lat, compra.lng, compra.total];
    return this.database.executeSql('INSERT INTO compras(nombre, apellido, lat, lng, total) VALUES(?, ?, ?, ?, ?)', data)
      .then(res => {
        this.buscarCompras();
      });
  }

  buscarCompras() {
    return this.database.executeSql('SELECT * FROM compras', []).then(res => {
      let items: compras[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            lat: res.rows.item(i).lat,
            lng: res.rows.item(i).lng,
            total: res.rows.item(i).total
          });
        }
      }
      this.listaCompras.next(items);
    });
  }

  fetchCompras(): Observable<compras[]> {
    return this.listaCompras.asObservable();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
}

