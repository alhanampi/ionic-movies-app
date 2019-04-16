import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment'

//traigo en esta constante la URL de inicio de las imagenes. Importo en environment.
const URL = environment.imgPath

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  //recibo imagen, tipo string.w500 is width: 500. Devuelvo un string luego de eso.
  transform(img: string, size: string = 'w500'): string {

    //primero preguntar si existe imagen:
    if (!img) {
      return './../assets/no-image-banner.jpg'; //si no hay imagen devuelve esto
    }
    //uno las constantes que recibo
    const imgURL = `${URL}/${size}${img}`

    return imgURL;
  }

}

//luego va a haber que importar este pipe al módulo