import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolicitudSistemas } from 'src/app/modelos/componentes/solicitudSistemas';
import { Results } from 'src/app/modelos/results';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesService {
  api: string;

  constructor(private http: HttpClient) {
    this.api = environment.URL + 'Solicitudes';
  }

  /* =======================
     LISTAR
  ======================= */

  listar(
    pagina: number,
    cantidad: number,
    busqueda?: string,
  ): Observable<Results<SolicitudSistemas>> {
    const params: any = {
      pagina: pagina.toString(),
      tamanoPagina: cantidad.toString(),
    };

    if (busqueda) params.filtro = busqueda;

    return this.http.get<Results<SolicitudSistemas>>(`${this.api}/Listar`, {
      params,
    });
  }

  /* =======================
     OBTENER POR ID
  ======================= */

  getId(id: number) {
    return this.http.get<Results<SolicitudSistemas>>(`${this.api}/${id}`);
  }

  /* =======================
     CREAR
  ======================= */

  insert(solicitud: SolicitudSistemas) {
    return this.http.post<Results<SolicitudSistemas>>(`${this.api}`, solicitud);
  }

  /* =======================
     EDITAR
  ======================= */

  update(solicitud: SolicitudSistemas) {
    return this.http.put<Results<SolicitudSistemas>>(
      `${this.api}/${solicitud.idSolicitud}`,
      solicitud,
    );
  }

  /* =======================
     ELIMINAR LOGICO
  ======================= */

  delete(id: number) {
    return this.http.delete<Results<any>>(`${this.api}/${id}`);
  }
}
