import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { PipesModule } from '../pipes/pipes.module';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideshowParesComponent } from './slideshow-pares/slideshow-pares.component';
import { DetalleComponent } from './detalle/detalle.component';

@NgModule({
  //es un entry component porque se puede crear dinámicamente con angular
  entryComponents: [DetalleComponent],
  declarations: [
    //importo este componente y lo exporto porque lo voy a usar por fuera de este módulo
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
    DetalleComponent,
  ],
  imports: [
    CommonModule,
    IonicModule, //importo esto porque voy a usar cards y etc. Componentes de ionic.
    PipesModule //también necesito importarlo para usar el pipe que creé
  ],
  exports: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
    DetalleComponent,
  ]
})
export class ComponentsModule { }
