import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';

@NgModule({
  declarations: [
    ImagenPipe,
    ParesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImagenPipe,
    ParesPipe

  ] //lo exporto porque voy a necesitar usarlo fuera del módulo 
})
export class PipesModule { }
