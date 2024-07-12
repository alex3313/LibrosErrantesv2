import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Productos } from './productos';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
  getProductoById(idProducto: number) {
    throw new Error('Method not implemented.');
  }
  private database!: SQLiteObject;
  private tablaProductos: string = "CREATE TABLE IF NOT EXISTS producto(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL, precio VARCHAR(10) NOT NULL, autor VARCHAR(50) NOT NULL);";
  private registroInicial: string = "INSERT or IGNORE INTO producto(id, nombre, precio, autor) VALUES (1, 'El Pistolero', '10000', 'Stephen King');";
  private listaProductos = new BehaviorSubject<Productos[]>([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, public toastController: ToastController) {
    this.crearBD();
  }

  addProducto(nombre: string, precio: string, autor: string) { // Ajustado para aceptar nombre, precio y autor
    let data = [nombre, precio, autor];
    return this.database.executeSql('INSERT INTO producto(nombre, precio, autor) VALUES(?, ?, ?)', data)
      .then(res => {
        this.buscarProductos();
      });
  }

  updateProducto(id: number, nombre: string, precio: string, autor: string) { // Ajustado para aceptar nombre, precio y autor
    let data = [nombre, precio, autor, id];
    return this.database.executeSql('UPDATE producto SET nombre = ?, precio = ?, autor = ? WHERE id = ?', data)
      .then(res => {
        this.buscarProductos();
      });
  }

  deleteProducto(id: number) {
    return this.database.executeSql('DELETE FROM producto WHERE id = ?', [id])
      .then(res => {
        this.buscarProductos();
      });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'productos.db',
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
      await this.database.executeSql(this.tablaProductos, []);
      await this.database.executeSql(this.registroInicial, []);
      this.presentToast("Tabla Creada");
      this.buscarProductos();
      this.isDbReady.next(true);
    } catch (e) {
      this.presentToast("Error creando tabla: " + e);
    }
  }

  buscarProductos() {
    return this.database.executeSql('SELECT * FROM producto', []).then(res => {
      let items: Productos[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre,
            precio: res.rows.item(i).precio,
            autor: res.rows.item(i).autor
          });
        }
      }
      this.listaProductos.next(items);
    });
  }

  fetchProductos(): Observable<Productos[]> {
    return this.listaProductos.asObservable();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
}
