import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoPage } from './catalogo.page'; // Asegúrate de importar el nombre correcto del componente

const routes: Routes = [
  {
    path: '',
    component: CatalogoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogoPageRoutingModule {}