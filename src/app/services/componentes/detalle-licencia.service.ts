import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Results } from 'src/app/modelos/results';
import { DetalleLicencia } from 'src/app/modelos/componentes/detalleLicencia';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DetalleLicenciaService {
  api: string;

  constructor(private http: HttpClient) {
    this.api = environment.URL + 'DetalleLicencia_';
  }

  // ==========================================
  // LISTAR POR LICENCIA
  // ==========================================

  getList(idLicencia: number, pagina: number, cantidad: number) {
    const params = {
      pagina: pagina.toString(),
      tamanoPagina: cantidad.toString(),
    };

    return this.http.get<Results<DetalleLicencia>>(
      `${this.api}/Listar/${idLicencia}`,
      { params },
    );
  }

  // ==========================================
  // OBTENER POR ID
  // ==========================================

  getId(idDetLicencia: number) {
    return this.http.get<Results<DetalleLicencia>>(
      `${this.api}/${idDetLicencia}`,
    );
  }

  // ==========================================
  // CREAR
  // ==========================================

  insert(detalle: DetalleLicencia) {
    return this.http.post<Results<DetalleLicencia>>(this.api, detalle);
  }

  // ==========================================
  // EDITAR
  // ==========================================

  update(idDetLicencia: number, detalle: DetalleLicencia) {
    return this.http.put<Results<DetalleLicencia>>(
      `${this.api}/${idDetLicencia}`,
      detalle,
    );
  }

  // ==========================================
  // ELIMINAR / ANULAR
  // ==========================================

  delete(idDetLicencia: number) {
    return this.http.delete<Results<DetalleLicencia>>(
      `${this.api}/${idDetLicencia}`,
    );
  }
}
