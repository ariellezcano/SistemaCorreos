import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proveedor } from 'src/app/modelos/index.models';
import { Results } from 'src/app/modelos/results';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  api: string;

  constructor(private http: HttpClient) {
    this.api = environment.URL + 'Proveedor';
  }

  //LISTAR
  listar(pagina: number, cantidad: number, busqueda?: string) {
    const params: any = {
      pagina: pagina.toString(),
      tamanoPagina: cantidad.toString(),
    };

    if (busqueda) params.filtro = busqueda;

    return this.http.get<Results<Proveedor>>(`${this.api}/Listar`, {
      params,
    });
  }

  //OBTENER POR ID
  getId(id: number) {
    return this.http.get<Results<Proveedor>>(`${this.api}/${id}`);
  }

  //INSERTAR
  insert(item: Proveedor) {
    return this.http.post(`${this.api}`, item);
  }

  //EDITAR
  update(item: any) {
    return this.http.put(`${this.api}`, item);
  }

  //ELIMINAR
  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  //COMBO
  combo() {
    return this.http.get<Proveedor[]>(`${this.api}/Combo`);
  }
}
