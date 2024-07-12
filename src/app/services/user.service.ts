// user.service.ts
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuarios } from './usuarios';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private database!: SQLiteObject;
  private tablaUsuarios: string = "CREATE TABLE IF NOT EXISTS usuario(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL, email VARCHAR(50), password TEXT NOT NULL);";
  private listaUsuarios = new BehaviorSubject<Usuarios[]>([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private currentUser: Usuarios | null = null;
  getCurr: any;

  constructor(private sqlite: SQLite, private platform: Platform, public toastController: ToastController) {
    this.crearBD();
  }

  setCurrentUser(user: Usuarios) {
    this.currentUser = user;
  }

  getCurrentUser(): Usuarios | null {
    return this.currentUser;
  }

  isAdmin(): boolean {
    return this.currentUser ? this.currentUser.nombre === 'admin' : false;
  }

  addUser(nombre: string, email: string, password: string) {
    let data = [nombre, email, password];
    return this.database.executeSql('INSERT INTO usuario(nombre, email, password) VALUES (?, ?, ?)', data)
      .then(res => {
        this.buscarUsuarios();
      });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'usuarios.db',
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
      await this.database.executeSql(this.tablaUsuarios, []);
      this.presentToast("Tabla Creada");
  
      const adminExists = await this.database.executeSql('SELECT * FROM usuario WHERE nombre = ?', ['admin']);
      if (adminExists.rows.length === 0) {
        await this.database.executeSql('INSERT INTO usuario (nombre, email, password) VALUES (?, ?, ?)', ['admin', 'admin@example.com', '1234']);
        this.presentToast("Usuario admin creado");
      }
  
      this.buscarUsuarios();
      this.isDbReady.next(true);
    } catch (e) {
      this.presentToast("Error creando tabla: " + e);
    }
  }

  buscarUsuarios(): Promise<void> {
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      let items: Usuarios[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre,
            email: res.rows.item(i).email,
            password: res.rows.item(i).password
          });
        }
      }
      this.listaUsuarios.next(items);
    });
  }

  fetchUsers(): Observable<Usuarios[]> {
    return this.listaUsuarios.asObservable();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  login(nombre: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.fetchUsers().subscribe(users => {
        const user = users.find(u => u.nombre === nombre && u.password === password);
        if (user) {
          this.setCurrentUser(user);
          resolve();
        } else {
          reject("Usuario o contraseña incorrectos");
        }
      });
    });
  }

  logout() {
    this.currentUser = null;
  }

}

