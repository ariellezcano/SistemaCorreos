import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioCorreoDto } from 'src/app/modelos/componentes/relacionModelos/usuarioCorreoDto';
import { Correo } from 'src/app/modelos/index.models';
import { Results } from 'src/app/modelos/results';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CorreoInstitucionalService {
  api: string;

  constructor(private http: HttpClient) {
    this.api = environment.URL + 'Correo';
  }

  getList(
    pagina: number,
    cantidad: number,
    busqueda?: string,
    fechaDesde?: string,
    fechaHasta?: string,
    tipoCorreo?: string,
  ) {
    const params: any = {
      pagina: pagina.toString(),
      tamanoPagina: cantidad.toString(),
      nombre: busqueda ?? '',
      fechaDesde: fechaDesde ?? '',
      fechaHasta: fechaHasta ?? '',
    };

    // 👇 Solo se envía si corresponde (Personal / Dependencia)
    if (tipoCorreo) {
      params.tipoCorreo = tipoCorreo;
    }

    return this.http.get<Results<UsuarioCorreoDto>>(`${this.api}/Listar`, {
      params,
    });
  }

  getId(id: number) {
    //console.log('servicio', id);
    return this.http.get(this.api + '/' + id);
  }

  getIdCorreo(idCorreo: number) {
    return this.http.get(this.api + '/correo/' + idCorreo);
  }

  insert(evento: any) {
    return this.http.post(this.api, evento);
  }

  update(item: any) {
    return this.http.put(`${this.api}`, item);
  }

  patch(id: number, actaRecibida: any, fechaRecepcion: any) {
    return this.http.patch(`${this.api}/${id}`, {
      actaRecibida,
      fechaRecepcion,
    });
  }

  delete(id: number, usuarioBaja: number) {
    //console.log('servicio:', id, usuarioBaja);
    return this.http.delete(`${this.api}/${id},${usuarioBaja}`);
  }

  updateCorreoSolicitante(correo: any, solicitante: any) {
    const body = {
      correo: correo,
      solicitante: solicitante,
    };

    return this.http.put(`${this.api}/actualizar-correo-solicitante`, body);
  }
}
