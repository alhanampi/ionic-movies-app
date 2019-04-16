import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [] //lo inicializo vacio
  popular: Pelicula[] = []

  //opciones de los slides. Son llevadas al componente de slideshow ahora:
  // slidesOpts = {
  //   slidesPerView: 1.1, //significa que va a mostrar la imagen completa y un poco de la siguiente
  //   freeMode: true
  // }

  constructor(
    //inyecto el servicio de películas que creé:
    private moviesService: MoviesService
  ) {

  }

  ngOnInit() {
    this.moviesService.getFeature()
      .subscribe(resp => {
        this.peliculasRecientes = resp.results //al array vacío le pusheo esta respuesta
      })

    this.getPopulares() //antes todo lo de la funcion estaba aca afuera, pero como se va a llamar varias veces se hace funcion
  }


  cargarMas() {
    this.getPopulares();

  }

  //optimizar codigo para no repetir en populares y en cargar más:
  getPopulares() {

    this.moviesService.getPopular()
      .subscribe(resp => {

        const arrTemp = [... this.popular, ...resp.results]

        this.popular = arrTemp //con el spread las sumo en vez de reemplazar. No se puede hacer un push con spread como en la app de noticias.
      })
  }

}