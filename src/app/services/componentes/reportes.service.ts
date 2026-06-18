import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioCorreoDto } from 'src/app/modelos/componentes/relacionModelos/usuarioCorreoDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  api: string;

  constructor(private http: HttpClient) {
    this.api = environment.URL + 'Reporte';
  }

  generarActaCorreo(item: UsuarioCorreoDto): Observable<Blob> {
    return this.http.post(`${this.api}/ActaCorreo`, item, {
      responseType: 'blob',
    });
  }
}
