import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonalDTI } from 'src/app/modelos/componentes/personalDTI';
import { Results } from 'src/app/modelos/results';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonalDTIService {
  api: string;

  constructor(private http: HttpClient) {
    this.api = environment.URL + 'PersonalDTI';
  }

  getList(pagina: number, cantidad: number, busqueda?: string) {
    const params = {
      pagina: pagina.toString(),
      tamanoPagina: cantidad.toString(),
      filtro: busqueda ?? '',
    };

    return this.http.get<Results<PersonalDTI>>(
      `${this.api}/Listar`,
      { params }
    );
  }

  getId(id: number) {
    return this.http.get<Results<PersonalDTI>>(
      `${this.api}/${id}`
    );
  }

  insert(personal: PersonalDTI) {
    return this.http.post<Results<PersonalDTI>>(
      this.api,
      personal
    );
  }

  update(id: number, personal: PersonalDTI) {
    return this.http.put<Results<PersonalDTI>>(
      `${this.api}/${id}`,
      personal
    );
  }

  delete(id: number) {
    return this.http.delete<Results<PersonalDTI>>(
      `${this.api}/${id}`
    );
  }
}