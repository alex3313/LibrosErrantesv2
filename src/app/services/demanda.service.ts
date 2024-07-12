// demanda.service.ts
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Demanda } from './demanda';

@Injectable({
  providedIn: 'root'
})
export class DemandaService {
  private database!: SQLiteObject;
  private demandaTable = 'CREATE TABLE IF NOT EXISTS demanda(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author_name TEXT)';
  private demandaList = new BehaviorSubject<Demanda[]>([]);

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'demandas.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.createTables();
      }).catch((error: any) => console.error('Error opening database', error));
    });
  }

  private async createTables() {
    try {
      await this.database.executeSql(this.demandaTable, []);
    } catch (error) {
      console.error('Error creating demanda table', error);
    }
  }

  async addDemanda(title: string, author_name: string) {
    const data = [title, author_name];
    return this.database.executeSql('INSERT INTO demanda(title, author_name) VALUES (?, ?)', data)
      .then(() => {
        this.fetchDemandas();
      })
      .catch((error: any) => console.error('Error adding demanda', error));
  }

  fetchDemandas() {
    return this.database.executeSql('SELECT * FROM demanda', []).then((res: { rows: { length: number; item: (arg0: number) => { (): any; new(): any; id: any; title: any; author_name: any; }; }; }) => {
      let demandas: Demanda[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        demandas.push({
          id: res.rows.item(i).id,
          title: res.rows.item(i).title,
          author_name: res.rows.item(i).author_name
        });
      }
      this.demandaList.next(demandas);
    }).catch((error: any) => console.error('Error fetching demandas', error));
  }

  getDemandas() {
    return this.demandaList.asObservable();
  }
}
