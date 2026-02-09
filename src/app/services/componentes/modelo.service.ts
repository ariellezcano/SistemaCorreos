import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modelo } from 'src/app/modelos/componentes/modelo';
import { Results } from 'src/app/modelos/results';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ModeloService {
  api: string;

  constructor(private http: HttpClient) {
    this.api = environment.URL + 'Modelo';
  }

  listar(
    pagina: number,
    cantidad: number,
    busqueda?: string,
  ): Observable<Results<Modelo>> {
    const params: any = {
      pagina: pagina.toString(),
      tamanoPagina: cantidad.toString(),
    };

    if (busqueda) params.filtro = busqueda;

    return this.http.get<Results<Modelo>>(`${this.api}/Listar`, {
      params,
    });
  }

  /* =======================
       OBTENER POR ID
    ======================= */
  getId(id: number) {
    return this.http.get<Results<Modelo>>(`${this.api}/Obtener/${id}`);
  }

  /* =======================
       CREAR
    ======================= */
  post(modelo: Modelo) {
    return this.http.post(`${this.api}`, modelo);
  }

  /* =======================
       EDITAR
    ======================= */
  update(modelo: Modelo) {
    return this.http.put(`${this.api}`, modelo);
  }

  /* =======================
       ELIMINADO LOGICO
    ======================= */

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
