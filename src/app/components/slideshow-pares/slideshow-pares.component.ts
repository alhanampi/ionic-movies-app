import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';


@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {


  @Input() peliculas: Pelicula[] = [];
  //output para poder emitir. Asegurarse que esté en angular core
  @Output() cargarMas = new EventEmitter();

  slidesOpts = {
    slidesPerView: 2.5, 
    freeMode: true,
    spaceBetween: -15
  }

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  onClick() {
  this.cargarMas.emit() //el slideshow le emite al padre la orden de cargar más peliculas
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
