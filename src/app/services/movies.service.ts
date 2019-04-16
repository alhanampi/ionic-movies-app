import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Pelicula, Genre } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }
    
  //privado porque solo va a funcionar internamente en este servicio:
    private ejecutarQuery<T>(query: string) {
      query = URL + query;
      //todas mis peticiones van a tener esto al final
      query += `&api_key=${apiKey}&language=es&include_image_language=es`
      return this.http.get<T>( query );
    }

    private popularesPage = 0;
    generos: Genre[] = [] //para los generos que le paso abajo. Vienen de interface

    //ordenar por popularidad
    getPopular() {

      this.popularesPage++;

      const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
      return this.ejecutarQuery<RespuestaMDB>(query);
    }



  //no requiero argumentos:
  //al get le pongo que es del tipo RespuestaMDB( el JSON que creé en interfaces, y así saco el tipo del tab)
    getFeature() {
    //variables fecha para armar y pasar a la ruta (si fuera estatico sería así: primary_release_date.gte=2019-03-01&primary_release_date.lte=2019-03-31):
    const hoy = new Date()
    const ultimoDia = new Date (hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate() //sumo un mes, empiezo desde dia 0
    const mes = hoy.getMonth() + 1 //el +1 porque empieza a contar en 0 y yo necesito el mes correcto para la api

    let mesString;

    if ( mes < 10) {
      mesString = '0' + mes //le pongo un 0 adelante así aparece cuando arme
    } else {
      mesString = mes
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`


      //antes era this.http.get, pero ahora eso lo traigo desde el ejecutar query
      return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`)
    }

    //servicio para detalles de pelicula:

    getPeliculaDetalle(id: string) {
      return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`) //a=1 no hace nada, pero es para evitar que se ponga un ampersand por defecto. El peliculaDetalle lo trae de interface
    }
    
//actores:
    getActores(id: string) {
      return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`) //a=1 no hace nada, pero es para evitar que se ponga un ampersand por defecto. El peliculaDetalle lo trae de interface
    }

    buscarPelicula(texto:string) {
      return this.ejecutarQuery<Pelicula>(`/search/movie?query=${texto}`) //buscar pelicula
    }

    //generos. Le tengo que especificar que lo qe va a devolver es una promesa con un array any:
    cargarGeneros(): Promise<Genre[]> {

      //otra forma de hacer promesas
      return new Promise (resolve => {

        this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe( resp => {
          this.generos = resp['genres'] //genres es el nombre que trae del servicio
          console.log((this.generos))
          resolve(this.generos) //aca resuelve la promesa
        })
      })
    }


}
