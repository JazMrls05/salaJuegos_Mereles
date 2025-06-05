import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';


@NgModule({
  declarations: [], // Componentes, directivas o pipes relacionadas. NO componentes STANDALONE
  imports: [CommonModule, JuegosRoutingModule],
  exports: [], // Si quiero usar mi componente declarado en otro componente
})
export class JuegosModule { }
