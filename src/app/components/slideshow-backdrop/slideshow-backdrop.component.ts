import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces'
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  //input tiene que ser importado
  @Input() peliculas: Pelicula[] = []; //pelicula daba error porque no se había hecho el import

  slidesOpts = {
    slidesPerView: 1.1, //significa que //importo este componente y lo exporto porque lo voy a usar por fuera de este módulova a mostrar la imagen completa y un poco de la siguiente
    freeMode: true
  }

  constructor(
    //importo el modal de detalles:
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

    async verDetalle(id: string) {
      //lo meto en una const porque devuelve información. Hay que sumar el await porque regresa una promesa
      const modal = await this.modalCtrl.create({
        component: DetalleComponent,
        componentProps: {
          id
        }

      });
      modal.present();
    }

}
