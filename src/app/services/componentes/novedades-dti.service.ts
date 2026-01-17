import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NovedadesDTO } from 'src/app/modelos/componentes/relacionModelos/novedades-dto';
import { Results } from 'src/app/modelos/results';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NovedadesDtiService {
  api: string;

  constructor(private http: HttpClient) {
    this.api = environment.URL + 'NovedadesDTI';
  }

  getList(
    pagina: number,
    cantidad: number,
    busqueda?: string,
    fechaDesde?: string,
    fechaHasta?: string
  ) {
    const params: any = {
      pagina: pagina.toString(),
      tamanoPagina: cantidad.toString(),
    };

    if (busqueda && busqueda.trim() !== '') {
      params.filtro = busqueda;
    }

    if (fechaDesde) {
      params.fechaDesde = fechaDesde;
    }

    if (fechaHasta) {
      params.fechaHasta = fechaHasta;
    }

    return this.http.get<Results<NovedadesDTO>>(`${this.api}/Listar`, {
      params,
    });
  }

  getId(id: number) {
    //console.log('servicio', id);
    return this.http.get(this.api + '/' + id);
  }

  insert(evento: any) {
    return this.http.post(this.api, evento);
  }

  update(id: number, evento: any) {
    return this.http.put(this.api + '/' + id, evento);
  }

  delete(id: number) {
    // console.log('servicio:', id);
    return this.http.delete(`${this.api}/${id}`);
  }
}
