import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioSolicitante } from 'src/app/modelos/index.models';
import { Results } from 'src/app/modelos/results';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioSolicitanteService {
  api: string;

  constructor(private http: HttpClient) {
    this.api = environment.URL + 'UsuarioSolicitante';
  }

  getList(pagina: number, cantidad: number, busqueda?: string) {
    const params = {
      pagina: pagina.toString(),
      tamanoPagina: cantidad.toString(),
      nombre: busqueda ?? '',
    };

    return this.http.get<Results<UsuarioSolicitante>>(`${this.api}/Listar`, {
      params,
    });
  }

  getId(id: number) {
    console.log('servicio', id);
    return this.http.get(this.api + '/' + id);
  }

  insert(evento: any) {
    return this.http.post(this.api, evento);
  }

  update(item: any) {
    return this.http.put(`${this.api}`, item);
  }

  patchJerarquia(id: number, jerarquia: string) {
  return this.http.patch(`${this.api}/${id}`, { jerarquia });
}

  // patch(id: number, evento: any) {
  //   return this.http.patch(this.api + '/' + id, evento);
  // }

  delete(id: number, usuarioBaja: number) {
    console.log('servicio:', id, usuarioBaja);
    return this.http.delete(`${this.api}/${id}/${usuarioBaja}`);
  }
}
