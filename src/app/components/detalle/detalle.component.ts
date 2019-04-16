import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController, ToastController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

//necesito el id para el modal de detalles  
@Input() id;

//tomar nombre de la pelicula:
pelicula: PeliculaDetalle = {}; //tego que asignar a un objeto vacío porque se crea antes de que se cargue, entonces da error en el html. Para que no dé error, en interfaz pongo ? delante de todos los valores
actores: Cast[] = []; //interfaces, es donde están los actores
oculto = 150; //valor para que corte el texto
star ='star-outline' //para que la estrella de favorito esté vacía

slideOptActores = {
  slidesPerView: 3.3,
  freeMode: true,
  spaceBetween: -5
}


  constructor(
    //inyecto el moviesService porque es de donde viene la lógica para traer data de la pelicula
    private moviesService: MoviesService,
    //necesito hacer un controller para poder hacer el boton de regresar:
    private modalCtrol: ModalController,
    //localstorage:
    private dataLocal: DataLocalService,
    
  ) { }

  
   ngOnInit() {

    //verificar si la pelicula existe:
    this.dataLocal.existePelicula(this.id) 
    .then (existe => this.star = (existe) ? 'star' : 'star-outline') // para cambiar cómo se ve la estrella si existe o no la pelicula. Solo son esto lo que hace es mostrarlo al volver a entrar, pero no actualiza


    this.moviesService.getPeliculaDetalle( this.id )
    .subscribe( resp => {
    //  console.log(resp)
      this.pelicula = resp
    })

    this.moviesService.getActores( this.id )
    .subscribe( resp => {
  //    console.log(resp)
      this.actores = resp.cast
    })
  }

  //cerrar modal 
  regresar() { 
    this.modalCtrol.dismiss()
  }

  //guardar favoritos en localStorage:
  favorito() {
    //no necesito argumentos porque ya los obtengo del input Id.
    const existe = this.dataLocal.guardarPelicula(this.pelicula)
    this.star = (existe) ? 'star' : 'star-outline' //este proceso es síncrono, por eso no requiere promesas
  }


}
