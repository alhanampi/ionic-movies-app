import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle [] = []

  constructor(
    private storage: Storage,
    private toastCtrl: ToastController,
    ) {
      this.cargarFavoritos() //solo necesito llamar a la accion

   }


  //guardar en el storage:
guardarPelicula(pelicula: PeliculaDetalle) {
  let existe = false //bandera para evitar que haya duplicados. En ppio es falsa
  let mensaje = '' //string vacío

  //varias opciones para chequear si ya existe. Otra es con find.
  for(const peli of this.peliculas) {
    if(peli.id === pelicula.id) {
      existe = true; //pregunto si existe una pelicula con ese id en ese array
      break //hago break porque si la encuentra ya no necesita seguir buscando
    }
  }
//si existe la tengo que excluir, para eso uso un filtro:
  if(existe) {
    //va a retornar un nuevo array con todas menos la que está duplicada. Al hacer click por segunda vez la remueve de los favoritos:
    this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id)
    mensaje = 'removido de favoritos'
  } else {
    this.peliculas.push(pelicula)
    mensaje = 'agregada a favoritos'

  }
//esta funcion de guardar en storage se dispara no importa qué condicion aplique  
  this.storage.set('peliculas', this.peliculas)
  this.presentToast(mensaje)

  return !existe
}

//aviso de que guardó
async presentToast(message: string) {
  const toast = await this.toastCtrl.create({
    message,
    duration: 1500
  })
toast.present()
}

  //este metodo debe ser llamado cuando el servicio es inicializado. Necesito que retorne una promesa con la info de los favoritos cargados. Necesito entonces que sea un async
  async cargarFavoritos() {
    const peliculas = await this.storage.get('peliculas')
    this.peliculas = peliculas || []; //uso el [] porque sino retornaría un null. Preferible que sea un array vacío
    return this.peliculas
  }

  //paso id porque es con lo que puedo confirmar si existe
  async existePelicula(id) {
 //   console.log(id)
    id = Number(id)
   // console.log(id)

    await this.cargarFavoritos();
    //si existe el id que estoy recibiendo como parámetro, retorna objeto de la pelicula:
  const existe = this.peliculas.find(peli => peli.id === id)
  return (existe)? true : false; //con esto lo convierto en un boolean. Si pusiera return existe retornaría todo un objeto
  }


}
