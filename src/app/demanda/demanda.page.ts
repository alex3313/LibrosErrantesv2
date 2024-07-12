// demanda.page.ts
import { Component, OnInit } from '@angular/core';
import { DemandaService } from '../services/demanda.service';
import { Observable } from 'rxjs';
import { Demanda } from '../services/demanda';

@Component({
  selector: 'app-demanda',
  templateUrl: './demanda.page.html',
  styleUrls: ['./demanda.page.scss'],
})
export class DemandaPage implements OnInit {
  demandas!: Observable<Demanda[]>;

  constructor(private demandaService: DemandaService) {}

  ngOnInit() {
    this.demandas = this.demandaService.getDemandas();
  }
}
