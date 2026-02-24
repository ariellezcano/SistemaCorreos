import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EquipamientoService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.URL + 'Equipamiento';
  }

  // ==========================
  // LISTAR (paginado + filtro)
  // ==========================
  listar(
    paginaActual: number,
    tamanoPagina: number,
    filtro?: string,
  ): Observable<any> {
    let params = new HttpParams()
      .set('paginaActual', paginaActual)
      .set('tamanoPagina', tamanoPagina);

    if (filtro) {
      params = params.set('filtro', filtro);
    }

    return this.http.get<any>(`${this.apiUrl}/Listar`, { params });
  }

  // ==========================
  // OBTENER POR ID
  // ==========================
  obtenerPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Obtener/${id}`);
  }

  // ==========================
  // CREAR
  // ==========================
  crear(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Crear`, data);
  }

  // ==========================
  // EDITAR
  // ==========================
  editar(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Editar`, data);
  }

  // ==========================
  // ELIMINAR (soft delete)
  // ==========================
  eliminar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Eliminar/${id}`);
  }
}
