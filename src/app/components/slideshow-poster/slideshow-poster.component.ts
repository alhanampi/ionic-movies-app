import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces'
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[] = []

  slidesOpts = {
    slidesPerView: 2.5, 
    freeMode: true,}

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {

  }

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
