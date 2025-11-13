import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlataformaCorreoDto } from 'src/app/modelos/componentes/relacionModelos/plataformaCorreoDto';
import { Results } from 'src/app/modelos/results';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlataformaService {
  api: string;

  constructor(private http: HttpClient) {
    this.api = environment.URL + 'Plataforma';
  }

  getList(pagina: number, cantidad: number, busqueda?: string) {
    const params = {
      pagina: pagina.toString(),
      tamanoPagina: cantidad.toString(),
      nombre: busqueda ?? '',
    };

    return this.http.get<Results<PlataformaCorreoDto>>(`${this.api}/Listar`, {
      params,
    });
  }

  getPorDni(dni: number) {
    return this.http.get(`${this.api}/buscar-por-dni/${dni}`);
  }

  getId(id: number) {
    //console.log('servicio', id);
    return this.http.get(this.api + '/' + id);
  }

  insert(evento: any) {
    return this.http.post(this.api, evento);
  }

  update(item: any) {
    return this.http.put(`${this.api}`, item);
  }

  patch(id: number, estado: string, fechaAlta: any, fechaNotificacion: any) {
    return this.http.patch(`${this.api}/${id}`, {
      estado,
      fechaAlta,
      fechaNotificacion,
    });
  }

  delete(id: number, usuarioBaja: number) {
    return this.http.delete(`${this.api}/${id},${usuarioBaja}`);
  }
}
