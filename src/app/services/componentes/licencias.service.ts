import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Licencias } from 'src/app/modelos/componentes/licencias';
import { Results } from 'src/app/modelos/results';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LicenciasService {

  api: string;

  constructor(private http: HttpClient) {
    this.api = environment.URL + 'Licencias';
  }

  getList(
    idPersonal: number,
    pagina: number,
    cantidad: number,
    busqueda?: string
  ) {
    const params = {
      pagina: pagina.toString(),
      tamanoPagina: cantidad.toString(),
      filtro: busqueda ?? '',
    };

    return this.http.get<Results<Licencias>>(
      `${this.api}/Listar/${idPersonal}`,
      { params }
    );
  }

  getId(idLicencia: number) {
    return this.http.get<Results<Licencias>>(
      `${this.api}/${idLicencia}`
    );
  }

  insert(licencia: Licencias) {
    return this.http.post<Results<Licencias>>(
      this.api,
      licencia
    );
  }

  update(idLicencia: number, licencia: Licencias) {
    return this.http.put<Results<Licencias>>(
      `${this.api}/${idLicencia}`,
      licencia
    );
  }

  delete(idLicencia: number) {
    return this.http.delete<Results<Licencias>>(
      `${this.api}/${idLicencia}`
    );
  }
}
