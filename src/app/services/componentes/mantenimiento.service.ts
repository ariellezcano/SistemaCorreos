import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MantenimientoDTO } from 'src/app/modelos/componentes/relacionModelos/mantenimientoDTO';
import { Mantenimiento } from 'src/app/modelos/index.models';
import { Results } from 'src/app/modelos/results';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MantenimientoService {
  api: string;

  constructor(private http: HttpClient) {
    this.api = environment.URL + 'MantenimientoSistema';
  }

  /* =======================
     LISTAR
  ======================= */
  listar(
    pagina: number,
    cantidad: number,
    busqueda?: string,
  ): Observable<Results<MantenimientoDTO>> {
    const params: any = {
      pagina: pagina.toString(),
      tamanoPagina: cantidad.toString(),
    };

    if (busqueda) params.filtro = busqueda;

    return this.http.get<Results<MantenimientoDTO>>(`${this.api}/Listar`, {
      params,
    });
  }

  /* =======================
     OBTENER POR ID
  ======================= */
  getId(id: number) {
    return this.http.get<Results<Mantenimiento>>(`${this.api}/${id}`);
  }

  /* =======================
     CREAR
  ======================= */
  insert(mantenimiento: {
    sistema: number;
    fechaTrabajo: Date;
    detalleMantenimiento: string;
  }) {
    return this.http.post<Results<Mantenimiento>>(`${this.api}`, mantenimiento);
  }

  /* =======================
     EDITAR
  ======================= */
  update(mantenimiento: Mantenimiento) {
    return this.http.put<Results<Mantenimiento>>(
      `${this.api}/${mantenimiento.idMantenimiento}`,
      mantenimiento,
    );
  }

  /* =======================
     ELIMINAR LÓGICO
  ======================= */
  delete(id: number) {
    return this.http.delete<Results<any>>(`${this.api}/${id}`);
  }
}
