import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from './../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  //el texto de la caja de busqueda empieza como un string vacío:
  textoBuscar = '';

  //para las sugerencias del buscador
  ideas: string[] = ['spiderman', 'avengers', 'amelie']

  peliculas: Pelicula[] = [] //el resultado de la busqueda

  buscando = false; //inicializa en falso porque no está buscando cuando cargo la app. Va a ser true cuando se lance la búsqueda

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController //modal detalles
  ) { }


  buscar(event) {
    const valor = event.detail.value

    //da problemas si la busqueda está vacía (al borrarla después de hacer una primera busqueda). Solución:

    if (valor.length === 0) {
      this.buscando = false; //desaparece spinner
      this.peliculas = [] //muestra sugerencias nuevamente
      return;
    }

    this.buscando = true
    this.moviesService.buscarPelicula(valor)
      .subscribe(resp => {
        console.log(resp)
        this.peliculas = resp['results']
        this.buscando = false // una vez que la búsqueda terminó vuelve a ser falso asi desaparece
        //no puedo simplemente hacer un resp.result porque no es un objeto que viene dentro de la respuesta del observable.
      })
  }

  //misma funcion del tab1 para traer los detalles
  async verDetalle(id: string) {
    
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }

    });
    modal.present();
  }

}
