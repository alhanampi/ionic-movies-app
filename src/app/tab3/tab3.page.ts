import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaDetalle[] = []
  generos: Genre[] = [] //este genre viene de interface

  favoritoGenero: any[] = []

  constructor (
    private dataLocal: DataLocalService, //inyecto el servicio de storage
    private moviesService: MoviesService, //traigo los géneros
  ) {}

  async ngOnInit () {

    this.peliculas = await this.dataLocal.cargarFavoritos() 
    //esta es una funcion en dataLocal, una vez que inyecté el servicio como private puedo llamarla. La hago volver como promesa
    this.generos = await this.moviesService.cargarGeneros() //aca llamo al servicio de generos que inyecté en el constructor

    //llamar por genero
    this. pelisPorGenero(this.generos, this.peliculas)

  }

  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]) {
    this.favoritoGenero = [] // debe inicializar vacío por si actualiza
    generos.forEach( genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter( peli => {
          return peli.genres.find(genre => genre.id === genero.id) //va a comparar a ver si el genero es el mismo en ambos casos, y si lo es retorna la pelicula, sino no retorna nada
        })
      })

    })
    console.log(this.favoritoGenero)
  }

}
