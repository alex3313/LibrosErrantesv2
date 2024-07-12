import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CatalogoPage } from './catalogo.page'; // Asegúrate de importar el nombre correcto del componente
import { CatalogoPageRoutingModule } from './catalogo-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogoPageRoutingModule
  ],
  declarations: [CatalogoPage]
})
export class CatalogoPageModule {}