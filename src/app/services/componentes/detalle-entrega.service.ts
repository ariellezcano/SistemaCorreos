import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetalleEntrega } from 'src/app/modelos/index.models';
import { Results } from 'src/app/modelos/results';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DetalleEntregaService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.URL + 'DetalleEntrega';
  }

  // 🔵 CREAR
  insert(model: DetalleEntrega) {
    return this.http.post<Results<DetalleEntrega>>(this.apiUrl, model);
  }

  update(model: DetalleEntrega) {
    return this.http.put<Results<DetalleEntrega>>(this.apiUrl, model);
  }

  obtenerPorId(id: number) {
    return this.http.get<Results<DetalleEntrega>>(`${this.apiUrl}/${id}`);
  }
}
